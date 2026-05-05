import React, { useState, useEffect } from 'react';
import { Save, Link as LinkIcon, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import ImageUploadField from '../components/ImageUploadField';
import MediaPreview from '../components/MediaPreview';
import { getDonationSettings, saveDonationSettings } from '../services/donationSettingsService';

const PLACEHOLDERS = {
    bankName: 'e.g. State Bank of India',
    accountName: 'e.g. Poondurai Kaadai Trust',
    accountNumber: 'e.g. 12345678901234',
    ifscCode: 'e.g. SBIN0001234',
    branch: 'e.g. Poondurai Main Branch',
    upiId: 'e.g. poonduraikaadai@sbi',
};

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/i;
const UPI_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;

const DonationSettings = () => {
    const [isSaved, setIsSaved] = useState(false);
    const [qrPreview, setQrPreview] = useState(null);
    const [selectedQrFile, setSelectedQrFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm({
        defaultValues: {
            bankName: '',
            accountName: '',
            accountNumber: '',
            ifscCode: '',
            branch: '',
            upiId: '',
        },
    });

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getDonationSettings();
                if (data) {
                    reset({
                        bankName: data.bankName || '',
                        accountName: data.accountName || '',
                        accountNumber: data.accountNumber || '',
                        ifscCode: data.ifscCode || '',
                        branch: data.branch || '',
                        upiId: data.upiId || '',
                    });
                    setQrPreview(data.qrImageUrl || null);
                }
            } catch (err) {
                console.error('Load settings failed:', err);
                toast.error('Failed to load settings', { id: 'donation-settings-error' });
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [reset]);

    const onSubmit = async (data) => {
        clearErrors('qrImage');
        if (!qrPreview && !selectedQrFile) {
            setError('qrImage', { type: 'manual', message: 'QR code image is required' });
            return;
        }
        setSaving(true);
        try {
            await saveDonationSettings(data, selectedQrFile || null);
            setSelectedQrFile(null);
            const updated = await getDonationSettings();
            setQrPreview(updated?.qrImageUrl || null);
            setIsSaved(true);
            toast.success('Donation settings saved successfully', { id: 'donation-settings' });
            setTimeout(() => setIsSaved(false), 3000);
        } catch (err) {
            console.error('Save failed:', err);
            toast.error('Failed to save settings', { id: 'donation-settings-error' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Donation Configuration</h2>
                <p className="text-gray-600 mt-1">Manage bank details and UPI information for incoming devotee donations.</p>
            </div>

            <div className="max-w-4xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Bank Details Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Bank Account Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name <span className="text-red-500">*</span></label>
                                <input {...register('bankName', { required: 'Bank name is required', minLength: { value: 2, message: 'Bank name must be at least 2 characters' } })} type="text" placeholder={PLACEHOLDERS.bankName} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary" />
                                {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name <span className="text-red-500">*</span></label>
                                <input {...register('accountName', { required: 'Account holder name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })} type="text" placeholder={PLACEHOLDERS.accountName} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary" />
                                {errors.accountName && <p className="text-red-500 text-xs mt-1">{errors.accountName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number <span className="text-red-500">*</span></label>
                                <input {...register('accountNumber', { required: 'Account number is required', pattern: { value: /^\d+$/, message: 'Only digits allowed' }, minLength: { value: 9, message: 'Account number must be 9–18 digits' }, maxLength: { value: 18, message: 'Account number must be 9–18 digits' } })} type="text" placeholder={PLACEHOLDERS.accountNumber} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary" />
                                {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code <span className="text-red-500">*</span></label>
                                <input {...register('ifscCode', { required: 'IFSC code is required', pattern: { value: IFSC_REGEX, message: 'Invalid IFSC format (e.g. SBIN0001234)' } })} type="text" placeholder={PLACEHOLDERS.ifscCode} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary uppercase" />
                                {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode.message}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name <span className="text-red-500">*</span></label>
                                <input {...register('branch', { required: 'Branch name is required', minLength: { value: 2, message: 'Branch name must be at least 2 characters' } })} type="text" placeholder={PLACEHOLDERS.branch} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary" />
                                {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* UPI Settings Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">UPI & QR Code Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><LinkIcon size={14} /> UPI ID Address <span className="text-red-500">*</span></label>
                                    <input {...register('upiId', { required: 'UPI ID is required', pattern: { value: UPI_REGEX, message: 'Invalid UPI ID format (e.g. name@bank)' } })} type="text" placeholder={PLACEHOLDERS.upiId} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary" />
                                    {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId.message}</p>}
                                </div>
                                <div className="bg-blue-50 text-blue-800 p-3 rounded-md flex items-start gap-2 text-sm border border-blue-100">
                                    <AlertCircle size={16} className="mt-0.5 shrink-0 text-blue-500" />
                                    <p>UPI ID and QR code will be displayed to devotees on the frontend donation page. Ensure the details are correct.</p>
                                </div>
                            </div>
                            <div>
                                <ImageUploadField
                                    value={qrPreview}
                                    onChange={(url) => { setQrPreview(url); if (url) clearErrors('qrImage'); }}
                                    onFileChange={setSelectedQrFile}
                                    label="Upload QR Code Image"
                                    required
                                    placeholder="Click to upload or drag & drop"
                                    previewClassName="w-24 h-24"
                                    imageFit="contain"
                                    onPreviewClick={(url) => url && setPreviewOpen(true)}
                                    aspectRatio={1}
                                />
                                {errors.qrImage && <p className="text-red-500 text-xs mt-1">{errors.qrImage.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        {/* {isSaved && <span className="text-green-600 font-medium text-sm flex items-center gap-1"><CheckCircle size={16} /> Settings Saved Successfully!</span>} */}
                        <button type="submit" disabled={saving} className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <Save size={18} /> {saving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>

            <MediaPreview media={{ fullUrl: qrPreview }} isOpen={previewOpen} onClose={() => setPreviewOpen(false)} />
        </div>
    );
};

export default DonationSettings;
