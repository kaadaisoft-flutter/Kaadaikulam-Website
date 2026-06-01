// Import images
import img1 from "../assets/Angalamman_Temple/Angalamman_Temple_Hero_optimized.webp";
import img2 from "../assets/Eswaran_Temple/Eswaran_Temple_Hero_optimized.webp";
import img3 from "../assets/images/karikaliaman_1-BmA6tM5O.webp";
import img4 from "../assets/Perumal_Temple/Peruma_Hero.webp";

// New Temple Details Deity Images
import newAngImg from "../assets/Temple_Data/Change_frame_and_background_202605251617.webp";
import newEswImg from "../assets/Temple_Data/change_frame_background_same_202605251615.webp";
import newKariImg from "../assets/Temple_Data/Change_frame_same_background_202605251619.webp";
import newPerImg from "../assets/Temple_Data/Change_frame_dont_change_background_202605251630.webp";

// Angalamman God Images
import ang_g1 from "../assets/Angalamman_God/DSC01350.webp";
import ang_g2 from "../assets/Angalamman_God/DSC01359.webp";
import ang_g3 from "../assets/Angalamman_God/DSC01366.webp";
import ang_g4 from "../assets/Angalamman_God/DSC01381.webp";
import ang_g5 from "../assets/Angalamman_God/DSC01384.webp";
import ang_g6 from "../assets/Angalamman_God/DSC01392.webp";
import ang_g7 from "../assets/Angalamman_God/DSC01401.webp";
import ang_g8 from "../assets/Angalamman_God/DSC01403.webp";
import ang_g9 from "../assets/Angalamman_God/DSC01405.webp";

// Eswaran God Images
import esw_g1 from "../assets/Eswaran_God/DSC01409.webp";
import esw_g2 from "../assets/Eswaran_God/DSC01415.webp";
import esw_g3 from "../assets/Eswaran_God/DSC01417.webp";
import esw_g4 from "../assets/Eswaran_God/DSC01419.webp";
import esw_g5 from "../assets/Eswaran_God/DSC01431.webp";
import esw_g6 from "../assets/Eswaran_God/DSC01435.webp";
import esw_g7 from "../assets/Eswaran_God/DSC01439.webp";
import esw_g8 from "../assets/Eswaran_God/DSC01444.webp";
import esw_g9 from "../assets/Eswaran_God/DSC01451.webp";
import esw_g10 from "../assets/Eswaran_God/DSC01454.webp";
import esw_g11 from "../assets/Eswaran_God/DSC01458.webp";
import esw_g12 from "../assets/Eswaran_God/DSC01464.webp";

// Kariyakaliyamman God Images
import kari_g1 from "../assets/Kariyakaliyamman_God/WhatsApp Image 2026-05-24 at 12.55.12 PM.webp";

// Perumal God Images
import per_g1 from "../assets/Perumal_God/DSC01216.webp";
import per_g2 from "../assets/Perumal_God/DSC01229.webp";
import per_g3 from "../assets/Perumal_God/DSC01240.webp";
import per_g4 from "../assets/Perumal_God/DSC01245.webp";
import per_g5 from "../assets/Perumal_God/DSC01250.webp";
import per_g6 from "../assets/Perumal_God/DSC01254.webp";
import per_g7 from "../assets/Perumal_God/DSC01264.webp";
import per_g8 from "../assets/Perumal_God/DSC01288.webp";
import per_g9 from "../assets/Perumal_God/DSC01292.webp";
import per_g10 from "../assets/Perumal_God/DSC01293.webp";
import per_g11 from "../assets/Perumal_God/DSC01298.webp";
import per_g12 from "../assets/Perumal_God/DSC01311.webp";
import per_g13 from "../assets/Perumal_God/DSC01325.webp";
import per_g14 from "../assets/Perumal_God/DSC01334.webp";
import per_g15 from "../assets/Perumal_God/DSC01338.webp";
import per_g16 from "../assets/Perumal_God/DSC01341.webp";
import per_g17 from "../assets/Perumal_God/DSC01343.webp";
import per_g18 from "../assets/Perumal_God/DSC01345.webp";

export const getTempleInfo = (language, t) => {
  const isTa = language === "ta";

  return {
    "sri-angalamman-temple": {
      name: t.items[1].name,
      image: img1,
      godImages: [newAngImg, ang_g1, ang_g2, ang_g3, ang_g4, ang_g5, ang_g6, ang_g7, ang_g8, ang_g9],
      visitingHours: isTa ? "காலை 6:00 - மதியம் 12:00, மாலை 4:00 - இரவு 8:00" : "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
      address: isTa ? "அவல்பூந்துறை, தமிழ்நாடு 638115" : "Avalpoondurai, Tamil Nadu 638115",
      features: isTa ? ["தினசரி பூஜை", "ஆண்டு திருவிழா", "சிறப்பு அபிஷேகம்"] : ["Daily Pooja", "Annual Festival", "Special Abhishekam"],
      about: isTa ?
        "எல்லாம் வல்ல பராசக்தியானவள் சிவபெருமானுடைய அங்கத்தில் தோன்றி இந்த லோகத்தை காக்கின்றாள், அந்த வண்ணம் முன்னோரு காலத்தில் பிரம்ம தேவனுக்கு ஐந்து தலைகள் இருந்தது அதனால் நான் சிவ பெருமானுக்கு நிகரானவர் என்ற அகந்தை கொண்டு இருந்தார் பிரம்ம தேவர் இதனால் கோபமுற்ற சிவபெருமான் பிரம்ம தேவனின் ஒரு தலையை கொய்து விடுகின்றார். அதனால பிரம்மாவின் அந்த தலை சிவபெருமானின் கையில் ஒட்டி கொள்ள பிரம்ம ஹத்தி தோஷமும் பிடித்து கொள்கிறது. இதை அறிந்த பராசக்தியானவள் சிவபெருமானை காக்க அவருடைய அங்கத்திலே இருந்து பிரிந்து அங்காளபரமேஸ்வரியாக மயானத்தில் காட்சி தருகின்றாள் சிவபெருமான் பிச்சை எடுத்து வருகின்றார். தன் கையில் ஒட்டி உள்ள பிரம்ம கபாலம் நீங்கவும் பிரம்ம ஹத்தி தோஷம் போகவும் அங்காளபரமேஸ்வரியிடம் பிச்சை கேட்டு உணவு வாங்கும் போது அந்த கபாலத்தை காலால் மிதித்து சிவபெருமானை காப்பாற்றி தாண்டவம் அதாவது சிவபெருமானுடன் சேர்ந்து நடனம் ஆடுகின்றாள் அதைதான் “அந்திப்பிைற பரமனுடனாடல் புரியங்காள பரமேஸ்வரியானந்த ரூபியே\" என்று அங்காளம்மன் துதியிலே குறிப்பிடப்பட்டுள்ளது. இவ்வாறாக அங்காள பரமேஸ்வரி தோன்றினாள். சிவபெருமானுடன் பம்பை உடுக்கை ஒலியுடன் ஆனந்த தாண்டவம் ஆடுகின்ற இந்த அங்காளபரமேஸ்வரியை வழிபட்டால் சகலவித பாவங்கள் பில்லி, சூனியம், ஏவல், செய்வினை கோளாறுகள் அனைத்து தோஷங்களும் நிவர்த்திஆகும். \n\nஇச்சிறப்புகளை பெற்ற அங்காளபரமேஸ்வரி ஆலயம் பார் புகழும் கொங்கு நாட்டின் முதன்மையாக விளங்குகின்ற பூந்துறை நாட்டில் சிறப்புடன் விளங்கிவரும் இந்த திருக்கோவில், பூந்துறை காடைகுல கொங்கு வேளாளகவுண்டர்களால் பல நூற்றாண்டுகளாக பல்வேறு திருப்பணிகளும் நடைபெற்றதும். 1947ல் பூந்துறை காடை குல கொங்கு வேளாளகவுண்டர்களால் மஹாகும்பாபிஷேகமும், 23.08.2010 மிகப்பெரிய திருப்பணிகள் செய்து மஹாகும்பாபிஷேகமும் சிறப்பாக நடைபெற்றது. இந்த ஆலயத்தில் மீண்டும் திருப்பணிகள் செய்து கோபுரங்கள் மஹாமண்டபங்கள் வர்ணங்கள் தீட்டப்பெற்றும் கன்னிமூலகணபதி ஆலயம், ஸ்ரீ சப்தகன்னிமார்கள் ஆலயம், இருளப்பர், பேச்சியம்மன், கருப்பண்ணசுவாமி ஆகிய ஆலயங்களும் திருப்பணிகள் செய்விக்கப்பெற்று குருவருளும், திருவருளும் கூட்டிவைத்த வண்ணம் நிகழும் மங்களகரமான விசுவாவசு வருடம் பங்குனி மாதம் 11-ஆம் நாள் 25.03.2026 புதன்கிழமை வளர்பிறை சப்தமி திதியும், மிருகசீரிஷ நட்சத்திரமும், சித்தயோகமும் கூடிய சுபயோக சுபதினத்தில் அன்று காலை 5.45 மணிக்குமேல் 6.30 மணிக்குள் மீன லக்னத்தில் பரிவார சகித அருள்தரும் அங்காளம்மனுக்கு மஹாகும்பாபிஷேகம் வேத சிவாகம முறைப்படி சிவாச்சாரியார்களை கொண்டு மிகச்சிறப்பான முறையில் நடைபெற்றது. பூந்துறை காடை குலத்தவர்களுக்கு அருள்தரும் அங்காளம்மன் மற்றும் அருள்மிகு கரியகாளியம்மன் ஆகிய இரு அன்னையரும் குலதெய்வங்களாக விளங்குகின்றனர்." :
        "The all-powerful Parasakthi appeared from Lord Shiva's body to protect the universe. In ancient times, Lord Brahma had five heads, which made him egoistic, claiming he was equal to Lord Shiva. Angered by this, Lord Shiva severed one of Brahma's heads. However, that severed skull stuck to Shiva's palm, and He was afflicted with the dreaded Brahmahatti Dosha. Upon learning this, Parasakthi, in order to save Lord Shiva, separated from His body and manifested as Angalaparameswari at the cremation grounds. Lord Shiva wandered seeking alms. To remove the skull stuck to His hand and cure the Brahmahatti Dosha, when He accepted food from Angalaparameswari, she dropped food on the ground, and as Shiva bent down, she stepped on the skull with her foot, releasing Him from the curse. She then performed the cosmic dance (Thandava) with Him, which is celebrated in the verse: 'Anthipirai paramanudan aadal puri Angalaparameswari ananda roopiye'. \n\nThus Angalaparameswari manifested. Worshipping Goddess Angalaparameswari, who dances with Lord Shiva to the rhythmic beats of Pambai and Udukkai, eradicates all sins, black magic, evil forces, sorcery, and planetary doshas. This temple, located in Poondurai Nadu, the foremost of the world-famous Kongu regions, has been preserved and renovated for centuries by the Poondurai Kaadai Kula Kongu Vellalar Gounders. A Maha Kumbhabhishekam was conducted in 1947, followed by another grand Kumbhabhishekam on 23.08.2010 after extensive renovations. Under the grace of Gurus and the divine, after rebuilding the towers (Gopurams), Maha Mandapams, applying vibrant paintings, and restoring the shrines of Kannimoola Ganapathi, Sri Saptha Kannimar, Irulappar, Pechiamman, and Karuppannaswamy, the grand Maha Kumbhabhishekam was celebrated on the auspicious day of Wednesday, 25.03.2026 (Visuvavasu Year, Panguni Month 11th day), during Sukla Paksha Saptami, Mrigaseerisha Nakshathra, and Siddha Yoga, between 5:45 AM and 6:30 AM in Meena Lagnam by learned Sivacharyas in accordance with Veda Sivagama principles. For the Poondurai Kaadai lineage, Arulmigu Angalamman and Arulmigu Kariya Kaliamman are worshipped as the dual clan deities.",
      kumbhabhishekam: {
        date: "25.03.2026",
        details: isTa ?
          "குருவருளும், திருவருளும் கூட்டிவைத்த வண்ணம் நிகழும் மங்களகரமான விசுவாவசு வருடம் பங்குனி மாதம் 11-ஆம் நாள் 25.03.2026 புதன்கிழமை வளர்பிறை சப்தமி திதியும், மிருகசீரிஷ நட்சத்திரமும், சித்தயோகமும் கூடிய சுபதினத்தில் காலை 5.45 மணிக்குமேல் 6.30 மணிக்குள் மீன லக்னத்தில் பரிவார சகித அருள்தரும் அங்காளம்மனுக்கு மஹாகும்பாபிஷேகம் வேத சிவாகம முறைப்படி சிவாச்சாரியார்களை கொண்டு மிகச்சிறப்பான முறையில் நடைபெற்றது." :
          "Under the grace of Gurus and the divine, the grand Maha Kumbhabhishekam for Arulmigu Angalamman along with Her parivaram was performed on the auspicious day of Wednesday, 25.03.2026 (Visuvavasu Year, Panguni Month 11th day), during Sukla Paksha Saptami, Mrigaseerisha Nakshathra, and Siddha Yoga, between 5:45 AM and 6:30 AM in Meena Lagnam by learned Sivacharyas in accordance with Veda Sivagama principles."
      },
      thuthi: {
        title: isTa ? "அருள்தரும் அங்காளம்மன் துதி:" : "Sri Angalamman Thuthi:",
        verse: isTa ?
          "வந்திப்பவர்க்கு வாழ்வுங் கதியு மகிழ்ந்தளிக்கு மழகிய திருவடியு மன்போடு சிந்திப்பவருளத் திருளைப் போக்கு ஞானத்தழற் கையுந் திரிசூலமுங்கொண்டு நந்திக் கணத்தவருடனே பம்பை முழங்கவொரு நாகத்துடுக்கையாலியும் அந்திப் பிறைப் பரமனுடனாடல் புரியங்காள பரமேஸ்வரி யானந்திரூபியே" :
          "Vanthippavarkku Vaazhvum Gathiyum Magizhnthalikkum Azhagiya Thiruvadiyum Anbodu Sinthippavarulath Thiruvaip Pokkum Gnanathazhar Kaiyum Thirisulamum Kondu Nanthi Ganathavarudane Pambai Muzhanga Oru Naagathudukkaiyoliyum Anthipirai Paramanudan Aadal Puri Angala Parameswari Ananda Roopiye",
        sub: isTa ? "(உலகைக் காக்க சிவனின் திருமேனியிலிருந்து தோன்றி ஆனந்த தாண்டவம் ஆடும் அன்னை)" : "(Praising Goddess Angalaparameswari who dances with Lord Shiva to protect the world)"
      },
      poem: {
        verse: isTa ?
          "மன்னர்பணி யும்பேரிய நாயகி மனோன்மணியின் மலரடியை மறவாதவர் - வன்மைசேர் \n\nவன்னிப்பூ பதி உதவு செல்லயன் காடைகுல மகராசர் காணியிது வே!" :
          "Mannarpani Yum Periya Nayagi Manonmaniyin Malaradiyai Maravathavar - Vanmaiser \n\nVannippoo Pathi Uthavu Sellayan Kaadaikula Magarasar Kaaniyithu Ve!",
        meaning: isTa ?
          "மன்னர்களே பணியும் 'பெரிய நாயகி' எனப்படும் அங்காளம்மனின் திருவடிகளை மறவாமல் போற்றி வணங்குபவர்கள் பூந்துறை காடை குலத்தினர். இவர்களின் ஆட்சிப்பகுதி (காணி) அம்மனின் அருளால் செழிப்பானது என்பது இதன் பொருள்." :
          "The Poondurai Kaadai clan are those who never forget and devoutly praise the sacred feet of Goddess Angalamman (known as Periya Nayagi), whom even kings worship. By Her divine grace, their ancestral land (Kaani) is blessed with eternal prosperity."
      }
    },
    "sri-pushpavaneswara-swamy-temple": {
      name: t.items[2].name,
      image: img2,
      godImages: [newEswImg, esw_g1, esw_g2, esw_g3, esw_g4, esw_g5, esw_g6, esw_g7, esw_g8, esw_g9, esw_g10, esw_g11, esw_g12],
      visitingHours: isTa ? "காலை 6:00 - 11:30, மாலை 4:30 - இரவு 8:30" : "6:00 AM - 11:30 AM, 4:30 PM - 8:30 PM",
      address: isTa ? "அவல்பூந்துறை, தமிழ்நாடு 638115" : "Avalpoondurai, Tamil Nadu 638115",
      features: isTa ? ["சிவராத்திரி", "தினசரி அபிஷேகம்", "ருத்ர அபிஷேகம்"] : ["Shivaratri", "Daily Abhishekam", "Rudra Abhishekam"],
      about: isTa ?
        "எல்லாம் வல்ல பரமேஸ்வர பெருமான் இந்த உலகத்தில் படைத்தல், காத்தல், அழித்தல், மறைத்தல், அருளல் என்று சொல்லகூடிய பஞ்ச க்ருத்யங்களை செய்கிறார். நிலம், நீர், நெருப்பு, காற்று, ஆகாயம் என்ற பஞ்சபூதங்களையும் தன்னகத்தே கொண்டும் \"தென்னாடுடைய சிவனே போற்றி எந்நாட்டவர்க்கும் இறைவா போற்றி\" என்ற வாக்கியத்திற்கு ஏற்ப நமது தென்னாட்டிலே பல சிறப்பான ஆலயங்களில் எழுந்தருளியும் பல திருவிளையாடல்கள் புரிந்தும் தன்னை ஆத்மார்த்தமாக வழிபட்ட 63 நாயன்மார்கள் மற்றும் பல அடியார்களுக்கு அருள் செய்தும் கருணை கடலாகவும் கயிலாய நாதனாகவும் உமையொரு பாகனாகவும் எழுந்து அருள்பாலிக்கின்ற ஆலயங்கள் பலவற்றுள் நமது கொங்கு நாட்டின் தலைமை நாடாகிய பூந்துறை நாட்டில் முன்னோரு காலத்தில் திருக்கயிலாயத்தில் உமாதேவிக்கு சிவபெருமானால் சாபம் ஏற்பட்டு அன்னையாகப்பட்டவள் பரம் பொருளை பிரிந்து இங்கு பூந்துறை நாட்டில் பூக்கள் நிறைந்த புஷ்பவனமத்தியில் சிவபெருமானை நினைத்து சாபம் நீங்க தவம் புரிகிறாள் சிவபெருமான் தவத்திற்கு இறங்கி இங்கு புஷ்பவனத்திலே உமா தேவியின் சாபம் நீக்கி புஷ்பவனேஸ்வரர் என்ற திருநாமத்தோடு எழுந்தருளி அருள்பாலிக்கிறார். \n\nநம் குலத்திற்கும் காசிக்கும் ஆழமான பிணைப்பு உண்டு. அதனால்தான் வாரணாசி கவுண்டர், காசிலிங்க கவுண்டர் போன்ற பெயர்கள் இன்றும் மக்களிடம் உள்ளன. அவல் பூந்துறை புஷ்பவேனஷ்வரர் ஆலயத்தில் உள்ள காசி விஸ்வநாதர், விசாலாட்சி சிலைகள் காசியிலிருந்து நேரடியாகக் கொண்டு வரப்பட்டவை. இத்தகைய சிறப்புகளை கொண்ட இந்த சிவஸ்தலம் மேற்கு நோக்கியும் வள்ளி தேவசேனாசமேதஷண்முகபெருமான் தெற்கு நோக்கியும் அமைந்துள்ளது. இந்த ஆலயம் மிகவும் பழமையானதாக உமா தேவியர் ஆலயத்தில் பண்டைகால கல்வெட்டு காணப்படுகின்றது. சேர வம்சாவழியில் கட்டபட்ட புஷ்பவனேஸ்வரர் ஆலயத்தை பூந்துறை காடைகுல கொங்கு வேளாளக்கவுண்டர்களால் பல்வேறு காலகட்டத்தில் பல திருப்பணிகள் செய்விக்கப்பட்டு 1952ல் கும்பாபிஷேகமும், பின் நடராஜர் ஆலயம் மண்டபம் புதிதாக நிர்மாணிக்கப்பட்டு 1976ல் கும்பாபிஷேக விழா பூந்துறை காடைகுல கொங்கு வேளாள கவுண்டர்களால் நடத்தபெற்றது பின் அருள்மிகு ஷண்முகபெருமான் ஆலயம் புதியதாக நிர்மாணிக்கப்பட்டு 1990ல் கும்பாபிஷேகம் நடைபெற்றது. பூந்துறை காடை குலத்தவர்களின் பெரும் முயற்சியால், வரும் 2026-ஆம் ஆண்டு மார்ச் மாதம் 25-ஆம் தேதி (புதன்கிழமை) அன்று இத்திருத்தலங்களுக்கு மகா கும்பாபிஷேகம் நடைபெற்றது." :
        "The Supreme Lord Parameswara performs the five cosmic activities (Pancha Kritya): creation, protection, dissolution, concealment, and grace. Embodying the five great elements of nature—earth, water, fire, air, and space—and true to the sacred saying 'Hail Lord Shiva of the South, the Lord of all nations!', He has manifested in numerous legendary temples across the southern land, enacting divine plays and showering His boundless mercy upon the 63 Nayanmars and countless devotees. Among the many temples where He reigns as the Lord of Kailash and the One who shares His body with Goddess Parvati, this temple in Poondurai Nadu, the primary region of Kongu Nadu, holds an ancient history. \n\nLong ago, Goddess Umadevi was cursed in Kailash, leading to her separation from Lord Shiva. She descended to the flower-filled forests (Pushpavanam) of Poondurai and performed rigorous penance to be liberated from the curse. Moved by her devotion, Lord Shiva appeared here, freed her from the curse, and stayed as Sri Pushpavaneswara. Our clan shares a profound spiritual connection with Kashi (Varanasi). This historical bond is the reason names like Varanasi Gounder and Kasilinga Gounder are prevalent in our community. The idols of Kashi Viswanathar and Visalakshi at the Pushpavaneswara temple were brought directly from Kashi. This unique west-facing Shiva temple features Lord Shanmuga with Valli and Devasena facing south. The temple is extremely ancient, with historical stone inscriptions preserved in the shrine of Goddess Uma. Built originally during the Chera dynasty, the temple underwent several renovations by the Poondurai Kaadai Kula Kongu Vellalar Gounders, leading to Kumbhabhishekams in 1952, 1976 (when the Nataraja shrine and mandapam were newly built), and 1990 (when the Shanmuga shrine was constructed). With the immense dedication and efforts of the Poondurai Kaadai clan, a grand Maha Kumbhabhishekam was celebrated on Wednesday, 25 March 2026.",
      kumbhabhishekam: {
        date: "25.03.2026",
        details: isTa ?
          "பூந்துறை காடை குலத்தவர்களின் பெரும் முயற்சியால், வரும் 2026-ஆம் ஆண்டு மார்ச் மாதம் 25-ஆம் தேதி (புதன்கிழமை) அன்று காலை 9.15 மணி முதல் 10.00 மணிக்குள், அருள்தரும் பாகம்பிரியாள் உடனமர் அருள்மிகு புஷ்பவனேஸ்வர சுவாமிக்கு மகா கும்பாபிஷேகம் வேத சிவாகம முறைப்படி சிவாச்சாரியார்களைக் கொண்டு மிகச்சிறப்பான முறையில் நடைபெற்றது." :
          "Through the great efforts of the Poondurai Kaadai clan, the grand Maha Kumbhabhishekam was performed for Arulmigu Bagampriyal Udanamar Sri Pushpavaneswara Swamy on Wednesday, 25 March 2026, between 9:15 AM and 10:00 AM by learned Sivacharyas in accordance with Veda Sivagama principles."
      },
      thuthi: {
        title: isTa ? "அருள்தரும் பாகம்பிரியாள் உடனமர் அருள்மிகு புஷ்பவனேஸ்வர சுவாமி பாடல்:" : "Sri Pushpavaneswara Swamy Verse:",
        verse: isTa ?
          "மாகஞ் சிறந்திரட்டும் மார்த்தாண்டன் பார்க்க வரிது பூகஞ் சிறந்திரட்டும் பூந்துறையே ஆகஞ்சும் வேதவனத்தான் இறைஞ்சும் வேதவனத்தான் இறைஞ்சும் வேதவனத்தான் இறைஞ்சும் வீடு." :
          "Maaganj Chiranthirattum Maarthandan Paarkka Varithu Pooganj Chiranthirattum Poonduraiye Aaganjum Vedhavanathaan Iraingum Vedhavanathaan Iraingum Vedhavanathaan Iraingum Veedu."
      },
      pathigam: {
        title: isTa ? "பூந்துறை வைப்புத் தலத்தைக் குறிப்பிடும் பதிகம் (திருநாவுக்கரசரின் 6-ம் திருமுறை, 71-வது பதிகம், 11-வது பாடல்):" : "Appar's Pathigam (Tevaram 6th Thirumurai, Pathigam 71, Song 11):",
        verse: isTa ?
          "கயிலாய மலையெடுத்தான் கரங்களோடு சிரங்களும் நெரியக்கால் விரலாற் செற்றோன் \n\nபயில்வாய பராய்த்துறை தென் பாலைத்துறை பண்டெழுவர் தவத்துறை வெண்டுறை பைம்பொழில் \n\nகுயிலாலந்துறை சோற்றுத்துறை பூந்துறை, பெருந்துறையும் குரங்காடுதுறையினோடு \n\nமயிலாடுதுறை கடம்பந்துறை ஆவடுதுறை மற்றும் துறை அனைத்தும் வணங்குவோமே." :
          "Kayilaaya Malaiyeduthaan Karangalodu Sirangalum Neriyakkaal Viralaar Setron \n\nPayilvaaya Paraaythurai Then Paalaithurai Pandeluvar Thavathurai Venthurai Paimbozhil \n\nKuyilaalanthurai Sotruthamai Poondhurai, Perunthuraiyum Kurangaaduthuraiyinodu \n\nMayilaaduthurai Kadambanthurai Aavaduthurai Matrum Thurai Anaithum Vananguvome.",
        meaning: isTa ?
          "பொழிப்புரை: கயிலாய மலையை எடுத்த இராவணனுடைய கரங்களும் சிரங்களும் வலிமை சிதையும் வண்ணம் தன் கால் விரலாற் செற்றோனாகிய சிவபெருமான் பயின்றுறையும் பராய்த்துறை, தென்பாலைத்துறை, எழுமுனிவர் பண்டு தவம் செய்த தவத்துறை, வெண்டுறை, பசிய சோலையிடத்துக் குயில்கள் வாழும் ஆலந்துறை, சோற்றுத்துறை, பூந்துறை, பெருந்துறை, குரங்காடுதுறை, மயிலாடுதுறை, கடம்பந்துறை, ஆவடுதுறை ஆகியவற்றையும் துறை என்னும் பெயர் தாங்கும் மற்றைய திருத்தலங்களையும் வணங்குவோம்." :
          "Translation: We worship Lord Shiva who crushed the hands and heads of Ravana when he tried to lift Mount Kailash, and who resides in Paraaythurai, Then-Paalaithurai, the ancient place of penance of the seven sages, Venthurai, Aalanthurai where cuckoos sing in lush groves, Sotruthurai, Poondhurai, Perunthurai, Kurangaaduthurai, Mayilaaduthurai, Kadambanthurai, Aavaduthurai, and all other sacred places bearing the name 'Thurai'."
      }
    },
    "sri-kariyakali-amman-temple": {
      name: t.items[0].name,
      image: img3,
      godImages: [newKariImg, kari_g1],
      visitingHours: isTa ? "காலை 7:00 - மதியம் 12:00, மாலை 5:00 - இரவு 8:00" : "7:00 AM - 12:00 PM, 5:00 PM - 8:00 PM",
      address: isTa ? "அவல்பூந்துறை, தமிழ்நாடு 638115" : "Avalpoondurai, Tamil Nadu 638115",
      features: isTa ? ["ஆடிப் பெருக்கு", "சிறப்பு ஆரத்தி", "நவராத்திரி"] : ["Aadi Perukku", "Special Arthi", "Navaratri"],
      about: isTa ?
        "பூந்துறை காடை குலத்தின் குலதெய்வம் அருள்மிகு கரியகாளியம்மன். கொங்கு 24 நாடுகளில் முதன்மை பெற்ற பூந்துறை நாடு என்று பெருமையுடன் அழைக்கப்படும் பண்பாட்டுப் பூந்துறையில் காடை குலத்தின் குல தெய்வமாக அருள்மிகு கரியகாளியம்மன், குல வழிபாட்டு மரபுகளையும் அதற்குரிய சமூக அமைப்புகளுடனும் தொடர்புடையதாக இருந்துள்ளது என்பது கல்வெட்டுப் பதிவுக்கல்வெட்டுகள், சிற்பங்கள், மண்-நாடு-குலம் பற்றிய குறிப்புகள் ஆகியவற்றிலிருந்தும், வரலாற்று ஆய்வுகள் மூலமாக ஒரு காலத்தில் ஆராயப்பட்டதில், இன்றும் இருக்கின்ற அந்தக் குறிப்புகள் நமக்கு, நமது குல தெய்வத்தின் உண்மையை நிரூபிக்கிறது. \n\n\"நானூற்றுப்பத்து நாட்டு பூந்து உறை இருக்கும் வெள்ளாளன் காடை குலத்தின் ஆதி குலதெய்வம் கரிய காளி...\" என தொடக்க மொழியுடன் உறுதிபடத் தெரிவிக்கிறது. (பூந்து உறை என்பது பூந்துறையைக் குறிக்கும்). மற்றொரு கல்வெட்டுடன் ஒப்பிடும்போது கி.பி. 1648 அல்லது அதற்கு முந்தையக் காலத்தை சேர்ந்ததாகவும் இருக்கலாம் என தெளிவுபடுத்துகிறது. நானூற்றுப்பத்து நாட்டு பூந்து உறை வெள்ளாளன் காடை குலத்தின் தெய்வ ஆராதனை கரியகாளி என்பதாக உள்ளது. இதன் அடிப்படையில், குறைந்தபட்சம் 16-17 ஆம் நூற்றாண்டிலிருந்து அருள்மிகு கரியகாளியம்மன் கோயில் காடை குலத்தின் குல தெய்வ வழிபாட்டு ஸ்தலமாக இருந்துள்ளது என்பதில் ஐயமின்றி தெரிந்து கொள்ள முடிகிறது. \n\n1883 ஆம் ஆண்டு கல்வெட்டு புதிப்பிப்பு பதிவுக்கல்வெட்டு ஒன்றில் குறிப்பிட்டிருப்பது, \"சுபசித்து கல் 4984/4 மேல்/பானு வருஷை/பூ உறை/காடை குல காளி கோயி...\" எனத் தொடங்குகிறது. 19-ஆம் நூற்றாண்டில் உள்ள கல்வெட்டு கரியகாளி அம்மன் கோயிலின் புதுப்பிப்பு அல்லது பராமரிப்பு நிகழ்ச்சி நடைபெற்று இருந்ததையும் தெளிவாக்குகிறது. அருள்மிகு கரியகாளியம்மன் கோயில் இருந்த 11-ஆம் நூற்றாண்டு முதல் 19-ஆம் நூற்றாண்டு வரை பரவிய பன்முகப் பதிவுகளான அரசியல் ஆதிக்கம், வழிபாட்டு மரபுகள் நிலம்-மண்-மக்கள் உறவுகள் ஆகியவற்றுப் பற்றிய குறிப்புகள் சென்னை காப்பகத்தில் இன்றும் காணலாம். ஒரு ஆதி கால வரலாற்றின் வழிபாட்டு மையமாகவும், காடை குல மக்களின் வழிபாட்டு உறவினை நினைவூட்டக் கூடிய இடமாகவும் அருள்மிகு கரியகாளியம்மன் கோயில் விளங்கி வந்ததாக கல்வெட்டுகளும், ஆய்வுகளும் நமது பார்வையில் இன்றும் உள்ளது. இதுவே, அருள்மிகு கரியகாளியம்மன் பூந்துறை காடை குலத்தின் குலதெய்வம் என்ற வாக்கு ஆன்மாவின் சத்தியம்! \"விதைக்கு மண் இல்லையென்றால் முளைக்காது, மண்ணும் நீரும் இருந்தால் விதை தானாகவே முளை விடும்\" என்ற பேருண்மையை மனதில் ஆழமாக உணர்ந்து கொண்டு நமது குல தெய்வமான அருள்மிகு கரியகாளியம்மனை வணங்குவோம்." :
        "Sri Kariyakali Amman is the primal clan deity of the Poondurai Kaadai clan. In the culturally rich region of Poondurai, which holds the pride of being the foremost of the 24 countries of Kongu, the worship of Sri Kariyakali Amman as the clan deity is deeply interwoven with lineage traditions and social structures. This historical connection is backed by ancient stone inscriptions, sculptures, and references to the land, nation, and lineage. Historical research of these records has proven the truth of our clan deity. \n\nAn ancient inscription unequivocally begins with: 'Kariya Kaali is the primal clan deity of the Vellalan Kaadai clan residing in Poondh-urai of the four hundred and ten countries...' (where Poondh-urai refers to Poondurai). Comparing this with other historical records suggests that this inscription dates back to 1648 A.D. or even earlier. It clarifies that the primary object of worship for the Vellalan Kaadai clan of the 410 countries is indeed Kariya Kaali. Based on this, there is no doubt that the Sri Kariyakali Amman Temple has served as the sacred clan deity worship center since at least the 16th or 17th century. \n\nA renovation inscription from 1883 A.D. starts with: 'Subachithu Kal 4984/4 Mel / Bhanu Varushai / Poo Urai / Kaadai Kula Kaali Koyil...'. This 19th-century inscription documents the upkeep and renovation of the temple during that era. Multifaceted records spanning the 11th to the 19th centuries detailing administrative authority, worship rituals, and the deep connection between the land, soil, and people of this temple are preserved to this day in the Chennai Archives. Stone inscriptions and modern research confirm that the Sri Kariyakali Amman Temple has always functioned as a historic center of worship and a symbol of unity for the Kaadai clan. This is the ultimate spiritual truth of Sri Kariyakali Amman being the ancestral deity of the Poondurai Kaadai clan! \n\nUnderstanding the eternal truth that 'a seed will not sprout without soil, but with soil and water, it sprouts naturally,' let us worship our clan deity, Sri Kariyakali Amman.",
      construction: isTa ? "அருள்மிகு கரியகாளியம்மன் ஆலயம் கட்டுமான பணிகள் நடந்து வருகின்றன." : "The construction works of Arulmigu Kariya Kaliamman Temple are currently in progress.",
      thuthi: {
        title: isTa ? "அருள்மிகு கரியகாளியம்மன் துதி!" : "Sri Kariyakali Amman Thuthi:",
        verse: isTa ?
          "பூந்துறைநல் தலத்துமேவும் கரிய காளி பூமிதனில் அருள்வழங்கும் சக்தி கொண்டு சாந்தமுடன் பக்தியோடு வருவோர்க்கெல்லாம் சகலசெளபாக்கியம் வழங்கிடுமோர் சொரூபி அம்மா" :
          "Poondurai Nal Thalathumevum Kariya Kaali Poomithanil Arulvazhangum Sakthi Kondu Santhamudan Bakthiyodu Varuvorkkellam Sagala Soubakkiyam Vazhangidumor Sorubi Amma"
      }
    },
    "sri-damodara-perumal-temple": {
      name: t.items[3].name,
      image: img4,
      godImages: [newPerImg, per_g1, per_g2, per_g3, per_g4, per_g5, per_g6, per_g7, per_g8, per_g9, per_g10, per_g11, per_g12, per_g13, per_g14, per_g15, per_g16, per_g17, per_g18],
      visitingHours: isTa ? "காலை 6:30 - 11:30, மாலை 5:00 - இரவு 8:30" : "6:30 AM - 11:30 AM, 5:00 PM - 8:30 PM",
      address: isTa ? "அவல்பூந்துறை, தமிழ்நாடு 638115" : "Avalpoondurai, Tamil Nadu 638115",
      features: isTa ? ["வைகுண்ட ஏகாதசி", "மார்கழி பூஜை", "கருட சேவை"] : ["Vaikuntha Ekadashi", "Margazhi Pooja", "Garuda Seva"],
      about: isTa ?
        "பூந்துறையின் வைணவச் சிறப்பை உலகிற்கு உணர்த்தும் பழமையான திருக்கோயில் இதுவாகும். எல்லாம் வல்ல வைகுண்ட வாசனாகவும், இந்த லோகத்தை காக்க கூடியவராகவும் தசாவதாரம் என்று சொல்லகூடிய 10 விதமான அவதாரங்களை எடுத்து பாற்கடலில் பள்ளி கொண்டு பரந்தாமனாகிய எம்பெருமான் கொங்கு மண்டலம் தலைமைபதியாகிய பூந்துறை நாட்டில் ஸ்ரீ அலமேலு மங்கை லக்ஷ்மி சமேத ஸ்ரீ தாமோதர பெருமாளாகவும் எழுந்து அருள்பாலிக்கிறார். \n\nஇந்த ஆலயம் நமது பூந்துறை காடைகுல கொங்கு வேளாளக்கவுண்டர்களால் பலநெடுங்காலமாக பல்வேறு திருப்பணிகளும் நிறைவான நித்ய பூஜை வைபவங்களும் தொன்று தொட்டு முறையே நடத்தபடுகிறது. இந்த ஆலயம் பல்வேறு திருப்பணிகள் மேற்கொள்ளபட்டு கோபுரங்கள் வர்ணங்கள் தீட்டப்பெற்று ஸ்ரீ அலமேலு மங்கை லக்ஷ்மி சமேத ஸ்ரீ தாமோதர பெருமாள், ஸ்ரீ கருடாழ்வார், ஸ்ரீ ஆஞ்சநேயர், புதியதாக ஸ்ரீ லட்சுமி நரசிம்மர், ஸ்ரீ சக்கரத்தாழ்வார், ஸ்ரீ ஹயக்ரீவர் ஆகிய சன்னதிகள் திருப்பணிகள் செய்விக்கப்பட்டும் அனைத்தும் நிறைவுற்ற நிலையில், நிகழும் மங்களகரமான விசுவாவசு வருடம் பங்குனி மாதம் 11-ஆம் நாள் (25.03.2026) புதன்கிழமை வளர்பிறை சப்தமி திதியும், மிருகசீரிஷ நட்சத்திரமும், சித்தயோகமும் கூடிய சுபயோக சுபதினத்தில் அன்று காலை 6.40 மணிக்குமேல் 7.20 மணிக்குள் மீன லக்னத்தில் மஹா சம்ப்ரோக்ஷணம் ஸ்ரீ அலமேலு மங்கை லக்ஷ்மி சமேத ஸ்ரீ தாமோதர பெருமாளுக்கு நடைபெற்றது." :
        "This is an ancient temple that reveals the Vaishnavite glory of Poondurai to the world. Manifesting as the Lord of Vaikuntha and the protector of the universe, who took the ten avatars (Dashavatara) and rests on the ocean of milk, the Lord is gracefully seated with Mother Alamelu Mangai Lakshmi in Poondurai Nadu, the capital of Kongu region, as Sri Damodara Perumal. \n\nManaged by the Poondurai Kaadai Kula Kongu Vellalar Gounders since time immemorial, this temple features regular daily pujas and grand ceremonies conducted traditionally. Following major restoration works, painting of the towers (Gopurams), and renovation of the shrines of Sri Alamelu Mangai Lakshmi, Sri Garuda Alvar, and Sri Anjaneyar, alongside newly built shrines for Sri Lakshmi Narasimhar, Sri Chakkarathazhwar, and Sri Hayagrivar, the grand Maha Samprokshanam (Kumbhabhishekam) was performed on the auspicious day of Wednesday, 25.03.2026 (Visuvavasu Year, Panguni Month 11th day), during Sukla Paksha Saptami, Mrigaseerisha Nakshathra, and Siddha Yoga, between 6:40 AM and 7:20 AM in Meena Lagnam.",
      kumbhabhishekam: {
        date: "25.03.2026",
        details: isTa ?
          "நிகழும் மங்களகரமான விசுவாவசு வருடம் பங்குனி மாதம் 11-ஆம் நாள் (25.03.2026) புதன்கிழமை வளர்பிறை சப்தமி திதியும், மிருகசீரிஷ நட்சத்திரமும், சித்தயோகமும் கூடிய சுபயோக சுபதினத்தில் அன்று காலை 6.40 மணிக்குமேல் 7.20 மணிக்குள் மீன லக்னத்தில் மஹா சம்ப்ரோக்ஷணம் ஸ்ரீ அலமேலு மங்கை லக்ஷ்மி சமேத ஸ்ரீ தாமோதர பெருமாளுக்கு வேத ஆகம முறைப்படி மிகச்சிறப்பாக நடைபெற்றது." :
          "The grand Maha Samprokshanam (Kumbhabhishekam) for Sri Alamelu Mangai Lakshmi Sametha Sri Damodara Perumal was performed on the auspicious day of Wednesday, 25.03.2026 (Visuvavasu Year, Panguni Month 11th day), during Sukla Paksha Saptami, Mrigaseerisha Nakshathra, and Siddha Yoga, between 6:40 AM and 7:20 AM in Meena Lagnam by learned priests according to Vedic traditions."
      },
      thuthi: {
        title: isTa ? "பெருமாள் துதி (திருப்பாவை):" : "Perumal Thuthi (Thiruppavai):",
        verse: isTa ?
          "மாயனை மன்னு வடமதுரை மைந்தனை தூய பெருநீர் யமுனைத் துறைவனை ஆயர் குலத்தினில் தோன்றும் அணிவிளக்கைத் தாயைக் குடல் விளக்கம் செய்த தாமோதரனை தூயோமாய் வந்து நாம் தூமலர் தூவித் தொழுது வாயினால் பாடி மனத்தினால் சிந்திக்க போய பிழையும் புகுதருவான் நின்றனவும் தீயினில் தூசாகும் செப்பேலோ ரெம்பாவாய்" :
          "Maayanai Mannu Vadamadhurai Mainthanai Thooya Peruneer Yamunaith Thuraivanai Aayar Kulathinil Thonrum Anivilakkaith Thaayaik Kudalvilakkam Seitha Thaamodharanai Thooyomaai Vanthunaam Thooumalar Thoouvith Thozhuthu Vaayinaal Paadi Manathinaal Sinthikkap Poaiya Pizhaiyum Pugutharuvaan Nintranavum Theeyinil Thoousaagum Seppelo Rempaavaai"
      }
    }
  };
};
