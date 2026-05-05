# Cloud Functions - Cloudinary Delete

Deploy this function to enable deleting gallery images/videos from Cloudinary when removing from Firebase.

## Setup

1. **Install dependencies:**
   ```bash
   cd functions && npm install
   ```

2. **Set Cloudinary secrets:**
   ```bash
   firebase functions:secrets:set CLOUDINARY_API_KEY
   firebase functions:secrets:set CLOUDINARY_API_SECRET
   ```
   Get these from [Cloudinary Dashboard](https://console.cloudinary.com) → Settings → API Keys.

3. **Deploy:**
   ```bash
   firebase deploy --only functions
   ```

4. **Copy the function URL** from the deploy output and add to your `.env`:
   ```
   VITE_CLOUDINARY_DELETE_URL=https://us-central1-poondurai-kaadai.cloudfunctions.net/cloudinaryDelete
   ```

## Note

- YouTube items have no `cloudinaryPublicId` and are deleted from Firestore only.
- Items uploaded before this change may not have `cloudinaryPublicId`; they will be deleted from Firestore only.
