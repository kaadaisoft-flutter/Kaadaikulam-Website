// Import images
import img1 from "../assets/images/angalaaman-DFWBKo-A.webp";
import img2 from "../assets/images/eswaran_kovil_1-D1sRlrA6.webp";
import img3 from "../assets/images/karikaliaman_1-BmA6tM5O.webp";
import img4 from "../assets/images/perumal_kovil_1-nbee0m8b.webp";

export const getTempleInfo = (language, t) => {
  const isTa = language === "ta";
  
  return {
    "sri-angalamman-temple": {
      name: t.items[0].name,
      image: img1,
      visitingHours: isTa ? "காலை 6:00 - மதியம் 12:00, மாலை 4:00 - இரவு 8:00" : "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
      address: isTa ? "அவல்பூந்துறை, தமிழ்நாடு 638115" : "Avalpoondurai, Tamil Nadu 638115",
      features: isTa ? ["தினசரி பூஜை", "ஆண்டு திருவிழா", "சிறப்பு அபிஷேகம்"] : ["Daily Pooja", "Annual Festival", "Special Abhishekam"],
      about: isTa ? 
        "உலகைக் காக்க சிவபெருமானின் திருமேனியிலிருந்து ஆதிசக்தி தோன்றினாள். புராண காலத்தில், பிரம்மதேவன் ஐந்து தலைகளுடன் தானும் சிவனுக்கு நிகரானவர் என்ற அகந்தையுடன் இருந்தார். கோபமுற்ற சிவன் பிரம்மாவின் ஒரு தலையைக் கொய்தார். அந்த கபாலம் சிவனின் கையில் ஒட்டிக்கொண்டது, பிரம்மஹத்தி தோஷம் அவரைப் பிடித்தது. சிவனைப் பாதுகாக்க, பராசக்தி மயானத்தில் அங்காளபரமேஸ்வரியாக அவதரித்தாள். சிவன் தோஷம் நீங்க பிச்சை எடுத்தபோது, அவள் தன் காலால் கபாலத்தை அழுத்தி, அவரைக் காப்பாற்றி, சிவனுடன் ஆனந்த தாண்டவம் ஆடினாள். \n\nபம்பை, உடுக்கை முழங்க சிவனுடன் ஆடும் அங்காளபரமேஸ்வரியை வணங்குவது பாவங்கள், பில்லி சூனியம், தீய சக்திகள், கர்ம வினைகள் மற்றும் அனைத்து தோஷங்களையும் நீக்குகிறது. கொங்கு நாட்டில் முதன்மையான பூந்துறை நாட்டின் இந்த புனித தலம் பல நூற்றாண்டுகளாக பூந்துறை காடை குல கொங்கு வெள்ளாளர் கவுண்டர்களால் புதுப்பிக்கப்பட்டு பராமரிக்கப்பட்டு வருகிறது. 1947-லும், மீண்டும் 23.08.2010-லும் மகா கும்பாபிஷேகம் நடைபெற்றது." :
        "The all-powerful Parasakthi appeared from Lord Shiva's body to protect the world. In ancient times, Lord Brahma had five heads and developed ego that he was equal to Shiva. Angered, Shiva plucked one of Brahma's heads. That skull stuck to Shiva's hand and Brahmahatti dosha afflicted Him. To protect Shiva, Parasakthi manifested as Angalaparameswari in the cremation grounds. When Shiva sought alms to remove the dosha, She pressed the skull down with Her foot, saved Him, and performed the blissful Ananda Thandava with Shiva. \n\nWorshipping Angalaparameswari who dances with Shiva amidst the sounds of pambai and udukkai removes sins, black magic, evil influences, karmic afflictions, and all doshas. This sacred shrine in Poondurai Nadu, the foremost in Kongu Nadu, has been renovated and maintained for centuries by the Poondurai Kaadai Kula Kongu Vellalar Gounders. Maha Kumbhabhishekam was performed in 1947 and again with major works on 23.08.2010.",
      kumbhabhishekam: {
        date: "25.03.2026",
        details: isTa ? 
          "கோபுரங்கள், மகா மண்டபங்கள், ஓவியங்கள் மற்றும் கன்னிமூல கணபதி, சப்த கன்னியர், இருளப்பர், பேச்சியம்மன், கருப்பண்ணசாமி ஆகியோருக்கான சன்னதிகள் உள்ளிட்ட விரிவான சீரமைப்புப் பணிகளுக்குப் பிறகு, மகா கும்பாபிஷேகம் 25.03.2026 புதன்கிழமை, விசுவாவசு ஆண்டு, பங்குனி மாதம், சுக்ல பட்ச சப்தமி, மிருகசீரிஷம் நட்சத்திரம், சித்த யோகத்தில், காலை 5.45 மணி முதல் 6.30 மணிக்குள் மீன லக்னத்தில் வேத சைவ ஆகம முறைப்படி சிறப்பாக நடைபெற்றது." :
          "After extensive restoration works including gopurams, maha mandapams, paintings, and shrines for Kannimoola Ganapathi, Saptha Kannimar, Irulappar, Pechiamman, and Karuppannaswamy, the grand Maha Kumbhabhishekam was performed on Wednesday, 25.03.2026, in the auspicious Visuvavasu year, Panguni month, Sukla Paksha Sapthami, Mrigaseerisham star, and Siddha Yoga, between 5.45 AM and 6.30 AM in Meena Lagnam according to Vedic Saiva Agama tradition."
      },
      thuthi: {
        title: isTa ? "ஸ்ரீ அங்காளம்மன் துதி:" : "Sri Angalamman Thuthi:",
        verse: isTa ? 
          "வந்திப்பவர்க்கு வாழ்வுங் கதியு மகிழ்ந்தளிக்கு மழகிய திருவடியுமு நண்பொடு..." :
          "Vanthippavarkku Vaazhvum Gathiyum Magizhnthalikkum Azhagiya Thiruvadiyum Nanpodu...",
        sub: isTa ? "(உலகைக் காக்க சிவனின் திருமேனியிலிருந்து தோன்றிய அங்காளம்மனைப் போற்றுதல்)" : "(Praising Angalamman who was born from Shiva's body to protect the world)"
      },
      poem: {
        verse: isTa ? 
          "மன்னர்பணி யும்பேரிய நாயகி மனோன்மணியின்\n\nமலரடியை மறவாதவர் - வன்மைசேர்\n\nவன்னிப்பூ பதி உதவு செல்லயன் காடைகுல\n\nமகராசர் காணியிது வே!" :
          "Mannarpani Yum Periya Nayagi Manonmaniyin\n\nMalaradiyai Maravathavar - Vanmaiser\n\nVannippu Pathi Uthavu Sellayan Kaadaikula\n\nMagarasar Kaaniyithu Ve!",
        meaning: isTa ? 
          "பூந்துறை காடை குலத்தினர் மன்னர்களாலும் 'பெரிய நாயகி' என்று போற்றப்படும் அங்காளம்மனின் மலரடிகளை மறவாமல் பக்தியுடன் வணங்குபவர்கள். அவர்களின் ஆட்சிப் பகுதி (காணி) அம்மனின் அருளால் செழிப்படைந்தது என்பதை இப்பாடல் விளக்குகிறது." :
          "The Poondurai Kaadai clan are those who never forget and devoutly worship the sacred feet of Angalamman, hailed as the 'Periya Nayagi' even by kings. The verse explains that their ruling region (Kaani) prospered by the divine grace of the Goddess."
      }
    },
    "sri-pushpavaneswara-swamy-temple": {
      name: t.items[1].name,
      image: img2,
      visitingHours: isTa ? "காலை 6:00 - 11:30, மாலை 4:30 - இரவு 8:30" : "6:00 AM - 11:30 AM, 4:30 PM - 8:30 PM",
      address: isTa ? "அவல்பூந்துறை, தமிழ்நாடு 638115" : "Avalpoondurai, Tamil Nadu 638115",
      features: isTa ? ["சிவராத்திரி", "தினசரி அபிஷேகம்", "ருத்ர அபிஷேகம்"] : ["Shivaratri", "Daily Abhishekam", "Rudra Abhishekam"],
      about: isTa ?
        "பரமேஸ்வரன் படைத்தல், காத்தல், அழித்தல், மறைத்தல், அருளுதல் ஆகிய ஐந்தொழில்களைச் செய்கிறார். அவர் நிலம், நீர், நெருப்பு, காற்று, ஆகாயம் ஆகிய ஐம்பூதங்களின் வடிவமாக இருக்கிறார். தென்னாடு முழுவதும் பல புகழ்பெற்ற ஆலயங்களில் சிவன் எழுந்தருளி, திருவிளையாடல்கள் புரிந்து, 63 நாயன்மார்களுக்கும் எண்ணற்ற அடியார்களுக்கும் அருள் புரிந்துள்ளார். \n\nஇந்த புனித தலங்களில், கொங்கு நாட்டின் முதன்மையான பூந்துறை நாட்டில் - கயிலாயத்தில் சாபம் காரணமாகப் பிரிந்த உமாதேவி, மலர்கள் நிறைந்த புஷ்பவனம் வந்து சாப விமோசனம் பெற தவம் செய்தாள். அவளது தவத்தில் மகிழ்ந்த சிவன், தோன்றி அவளது சாபத்தை நீக்கி, இங்கு ஸ்ரீ புஷ்பவனேசுவரராக எழுந்தருளினார்.\n\nநமது குலத்திற்கு காசியுடன் ஆழமான தொடர்பு உண்டு. அதனால்தான் வாரணாசி கவுண்டர், காசிலிங்க கவுண்டர் போன்ற பெயர்கள் நம் மக்களிடையே இன்றும் நிலைத்து நிற்கின்றன. அவல் பூந்துறை புஷ்பவனேசுவரர் கோவிலில் உள்ள காசி விஸ்வநாதர் மற்றும் விசாலாட்சி சிலைகள் நேரடியாக காசியிலிருந்து கொண்டு வரப்பட்டவை. இந்த கோவில் மிகவும் பழமையானது; உமாதேவி சன்னதியில் பழமையான கல்வெட்டுகள் காணப்படுகின்றன. சேரர் காலத்தில் கட்டப்பட்ட இது, பூந்துறை காடை குலத்தினரால் பலமுறை சீரமைக்கப்பட்டது (1952, 1976, 1990)." :
        "The Supreme Lord Parameswara performs the Pancha Krityas: creation, protection, dissolution, concealment, and grace. He embodies the five elements - earth, water, fire, air, and space. Shiva has manifested in many glorious temples across the south, enacted divine plays, and bestowed grace upon the 63 Nayanmars and countless devotees. \n\nAmong these sacred shrines, in Poondurai Nadu - the foremost region of Kongu Nadu - Goddess Uma, once separated due to a curse in Kailash, came to the flower-filled Pushpavanam and performed penance to be freed from the curse. Pleased by her tapas, Shiva appeared, removed her curse, and manifested here as Sri Pushpavaneswara.\n\nOur clan has a deep bond with Kashi. This is why names such as Varanasi Gounder and Kasilinga Gounder continue among our people. The Kashi Viswanathar and Visalakshi idols in Aval Poondurai Pushpavaneswara temple were brought directly from Kashi. The temple is very ancient; old inscriptions are seen in the Uma Devi shrine. Built in the Chera lineage period, it underwent multiple renovations by the Poondurai Kaadai clan (1952, 1976, 1990).",
      kumbhabhishekam: {
        date: "25.03.2026",
        details: isTa ?
          "பூந்துறை காடை குலத்தின் அர்ப்பணிப்பு முயற்சியால், 25 மார்ச் 2026 புதன்கிழமை இந்த புனித சன்னதிகளுக்கு மகா கும்பாபிஷேகம் நடைபெற்றது. காலை 9:15 மணி முதல் 10:00 மணிக்குள், அருள்மிகு பாகம்பிரியாள் உடனமர் ஸ்ரீ புஷ்பவனேசுவர சுவாமிக்கு கும்பாபிஷேகம் நடைபெற்றது." :
          "Through the dedicated efforts of the Poondurai Kaadai clan, Maha Kumbhabhishekam was performed for these sacred shrines on Wednesday, 25 March 2026. Between 9:15 AM and 10:00 AM, Kumbhabhishekam was performed for Arulmigu Bagampriyal Udanamar Sri Pushpavaneswara Swamy."
      },
      thuthi: {
        title: isTa ? "கோவில் பாடல்:" : "Temple Verse:",
        verse: isTa ?
          "மாகஞ் சிறந்திருக்கட்டும் மார்த்தாண்டன் பார்க்க வரிது\n\nபூகஞ் சிறந்திருக்கட்டும் பூந்துறையே ஆகஞ்சும்\n\nவேதவனத்தான் இறைஞ்சும் வேதவனத்தான் இறைஞ்சும்\n\nவேதவனத்தான் இறைஞ்சும் வீடு." :
          "Maaganj Chiranthirukkattum Maarthandan Paarkka Varithu\n\nPooganj Chiranthirukkattum Poonduraiye Aaganjum\n\nVedhavanathaan Iraingum Vedhavanathaan Iraingum\n\nVedhavanathaan Iraingum Veedu."
      },
      pathigam: {
        title: isTa ? "பதிகம் (திருநாவுக்கரசர், 6-ஆம் திருமுறை):" : "Pathigam (Thirunavukkarasar, 6th Thirumurai):",
        verse: isTa ?
          "கயிலை மலை எடுத்தான் கரங்களோடு...\n\n[...] பூந்துறை,\n\nபெருந்துறையும் குரங்கடுத்த துறையினோடு..." :
          "Kayilai Malai Eduthaan Karangalodu...\n\n[...] Poondurai,\n\nPerunthuraiyum Kurangadutha Thuraiyinodu...",
        meaning: isTa ?
          "சிவன் எழுந்தருளியுள்ள அனைத்து 'துறை' தலங்களையும் நாம் வணங்குகிறோம் - பராய்த்துறை, தென்பாலைத்துறை, பூந்துறை மற்றும் 'துறை' என்ற பெயரைக் கொண்ட அனைத்து புனித தலங்களையும்." :
          "We worship all these sacred 'thurai' shrines where Shiva resides - Paraythurai, Thenpaalaiththurai, Poondhurai, and all holy places bearing the name 'thurai'."
      }
    },
    "sri-kariyakali-amman-temple": {
      name: t.items[2].name,
      image: img3,
      visitingHours: isTa ? "காலை 7:00 - மதியம் 12:00, மாலை 5:00 - இரவு 8:00" : "7:00 AM - 12:00 PM, 5:00 PM - 8:00 PM",
      address: isTa ? "அவல்பூந்துறை, தமிழ்நாடு 638115" : "Avalpoondurai, Tamil Nadu 638115",
      features: isTa ? ["ஆடிப் பெருக்கு", "சிறப்பு ஆரத்தி", "நவராத்திரி"] : ["Aadi Perukku", "Special Arthi", "Navaratri"],
      about: isTa ?
        "ஸ்ரீ கரியகாளியம்மன் பூந்துறை காடை குலத்தின் ஆதி குலதெய்வம். இக்குலத்தின் வழிபாட்டு மரபுகளுடனான இதன் தொடர்பு கல்வெட்டுகள், சிற்பங்கள் மற்றும் வரலாற்று ஆய்வுகள் மூலம் நிரூபிக்கப்பட்டுள்ளது. \n\nஒரு குறிப்பிடத்தக்க கல்வெட்டு (கி.பி. 1648 அல்லது அதற்கு முந்தையது) உறுதிப்படுத்துகிறது: '...நாநூற்றுப் பத்து நாடுகளின் பூந்துறையில் வசிக்கும் வெள்ளாளன் காடை குலத்தின் ஆதி குலதெய்வம் கரிய காளி...'. மற்றொரு 1883 கல்வெட்டு 19-ஆம் நூற்றாண்டு சீரமைப்பை விவரிக்கிறது. சென்னை ஆவணக்காப்பகத்தில் உள்ள 11 முதல் 19-ஆம் நூற்றாண்டு வரையிலான பதிவுகள், இக்கோயில் காடை குலத்தின் வழிபாட்டு மையமாக இருந்ததை உறுதிப்படுத்துகின்றன. 'மண்ணில்லை என்றால் விதை முளைக்காது' என்பதை உணர்ந்து, நமது குலதெய்வத்தை நம் ஆன்மாவின் உண்மையுடன் வணங்குகிறோம்." :
        "Sri Karikaliamman is the primeval clan deity of the Poondurai Kaadai clan. Its association with the clan worship traditions is proven by stone inscriptions, sculptures, and historical research. \n\nOne significant inscription (1648 A.D. or earlier) affirms: '...the primal clan deity of the Vellalan Kaadai clan residing in the Poondurai of the four hundred and ten countries is Kariya Kaali...'. Another 1883 inscription details a 19th-century renovation. Records from the 11th to 19th centuries in the Chennai Archives confirm the temple's historical role as a center of worship for the Kaadai clan. Realizing that 'if there is no soil, a seed will not sprout,' we worship our clan deity with the truth of our soul.",
      construction: isTa ? "அருள்மிகு கரியகாளியம்மன் கோவில் கட்டுமானப் பணிகள் தற்போது நடைபெற்று வருகின்றன." : "The construction work of Arulmigu Karikaliamman Temple is currently underway.",
      thuthi: {
        title: isTa ? "ஸ்ரீ கரியகாளியம்மன் துதி:" : "Sri Karikaliamman Thuthi:",
        verse: isTa ?
          "பூந்துறை நல் தலத்துமேவும் கரிய காளி\n\nபூமிதனில் அருள்வழங்கும் சக்தி கொண்டு\n\nசாந்தமுடன் பக்தியோடு வருவோர்க்கெல்லாம்\n\nசகலசௌபாக்கியம் வழங்கிடுமோர் சொரூபி அம்மா" :
          "Poondurai Nal Thalathumevum Kariya Kaali\n\nPoomithanil Arulvazhangum Sakthi Kondu\n\nSanthamudan Bakthiyodu Varuvorkkellam\n\nSagala Soubakkiyam Vazhangidumor Sorubi Amma"
      }
    },
    "sri-damodara-perumal-temple": {
      name: t.items[4]?.name || t.items[3].name,
      image: img4,
      visitingHours: isTa ? "காலை 6:30 - 11:30, மாலை 5:00 - இரவு 8:30" : "6:30 AM - 11:30 AM, 5:00 PM - 8:30 PM",
      address: isTa ? "அவல்பூந்துறை, தமிழ்நாடு 638115" : "Avalpoondurai, Tamil Nadu 638115",
      features: isTa ? ["வைகுண்ட ஏகாதசி", "மார்கழி பூஜை", "கருட சேவை"] : ["Vaikuntha Ekadashi", "Margazhi Pooja", "Garuda Seva"],
      about: isTa ?
        "இந்த புராதன கோயில் பூந்துறையின் வைணவப் பெருமையை உலகிற்கு எடுத்துரைக்கிறது. ஸ்ரீ அலமேலு மங்கை லட்சுமியுடன் ஸ்ரீ தாமோதர பெருமாளாக பரந்தாமன் இங்கே அருள்பாலிக்கிறார். \n\nபல நூற்றாண்டுகளாக பூந்துறை காடை குலத்தினால் நிர்வகிக்கப்பட்டு வரும் இக்கோயில் சமீபத்தில் பிரம்மாண்டமாக சீரமைக்கப்பட்டது. கோபுரங்களுக்கு அழகான வர்ணம் பூசுதல் மற்றும் ஸ்ரீ அலமேலு மங்கை லட்சுமி, ஸ்ரீ கருட ஆழ்வார், ஸ்ரீ ஆஞ்சநேயர் ஆகியோருக்கான சன்னதிகளை முழுமையாக மறுகட்டமைப்பு செய்தல் மற்றும் ஸ்ரீ லட்சுமி நரசிம்மர், ஸ்ரீ சக்கரத்தாழ்வார், ஸ்ரீ ஹயக்ரீவர் ஆகியோருக்கான புதிய சன்னதிகள் சேர்க்கப்பட்டன." :
        "This ancient temple showcases the Vaishnavite glory of Poondurai to the world. The Supreme Lord Paranthaman is graciously seated here as Sri Damodara Perumal with Sri Alamelu Mangai Lakshmi. \n\nGoverned by the Poondurai Kaadai clan for centuries, the temple recently underwent massive renovations. These included beautiful painting of tower gopurams and full reconstruction of shrines for Sri Alamelu Mangai Lakshmi, Sri Garuda Alvar, Sri Anjaneyar, and the addition of new shrines for Sri Lakshmi Narasimhar, Sri Chakkarathazhwar, and Sri Hayagrivar.",
      kumbhabhishekam: {
        date: "25.03.2026",
        details: isTa ?
          "ஸ்ரீ அலமேலு மங்கை லட்சுமி சமேத ஸ்ரீ தாமோதர பெருமாளுக்கு மகா சம்ப்ரோக்ஷணம் (கும்பாபிஷேகம்) 25.03.2026 புதன்கிழமை (பங்குனி 11-ஆம் நாள்), சுப மீன லக்னத்தில் காலை 6:40 முதல் 7:20 மணிக்குள் நடைபெற்றது." :
          "The Maha Samprokshanam (Kumbhabhishekam) for Sri Alamelu Mangai Lakshmi Sametha Sri Damodara Perumal was held on Wednesday, 25.03.2026 (Panguni 11th day), during the auspicious Meena Lagnam between 6:40 AM and 7:20 AM."
      },
      thuthi: {
        title: isTa ? "பெருமாள் துதி (திருப்பாவை):" : "Perumal Thuthi (Thiruppavai):",
        verse: isTa ?
          "மாயனை மன்னு வடமதுரை மைந்தனை\n\nதூய பெருநீர் யமுனைத் துறைவனை\n\nஆயர் குலத்தினில் தோன்றும் அணிவிளக்கைத்\n\nதாயைக் குடல்விளக்கம் செய்த தாமோதரனை\n\nதூயோமாய் வந்துநாம் தூமலர் தூவித் தொழுது\n\nவாயினால் பாடி மனத்தினால் சிந்திக்கப்\n\nபோய பிழையும் புகுதருவான் நின்றனவும்\n\nதீயினில் தூசாகும் செப்பேலோ ரெம்பாவாய்" :
          "Maayanai Mannu Vadamadhurai Mainthanai\n\nThooya Peruneer Yamunaith Thuraivanai\n\nAayar Kulathinil Thonrum Anivilakkaith\n\nThaayaik Kudalvilakkam Seitha Thaamodharanai\n\nThooyomaai Vanthunaam Thooumalar Thoouvith Thozhuthu\n\nVaayinaal Paadi Manathinaal Sinthikkap\n\nPoaiya Pizhaiyum Pugutharuvaan Nintranavum\n\nTheeyinil Thoousaagum Seppelo Rempaavaai"
      }
    }
  };
};
