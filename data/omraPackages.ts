import type { OmraPackage } from "@/types/omra"

export const omraPackages: OmraPackage[] = [
  {
    id: 1,
    name: "Standard Omra Package",
    image: "/omra-standard.jpg",
    departureDate: "2023-10-15",
    duration: 10,
    hotel: "3-star hotel in Mecca",
    transport: "Economy class flights",
    price: 1500,
    description:
      "Experience the spiritual journey of Omra with our comprehensive standard package. This package is designed for those seeking a meaningful pilgrimage without compromising on comfort and convenience. Our experienced guides will assist you throughout your journey, ensuring a smooth and fulfilling experience as you perform the sacred rituals in the holy cities of Mecca and Medina.",
    services: [
      "Visa Processing",
      "Hotel Accommodation",
      "Meals (3 per day)",
      "Airport Transfers",
      "Guided Tours",
      "Spiritual Guidance",
      "24/7 Support",
    ],
    itinerary: [
      "Day 1: Arrival in Jeddah and transfer to Mecca. Check-in at hotel and rest.",
      "Day 2: Morning orientation and preparation for Omra. Perform Umrah rituals with guidance.",
      "Day 3: Visit the Holy Kaaba for Tawaf and Sa'i. Evening lecture on the significance of rituals.",
      "Day 4: Explore historical sites in Mecca including Jabal al-Nour and Cave of Hira.",
      "Day 5: Free day for personal worship and reflection at Masjid al-Haram.",
      "Day 6: Optional visit to nearby historical sites and museums.",
      "Day 7: Transfer to Medina. Visit the Prophet's Mosque for prayers.",
      "Day 8: Guided tour of significant sites in Medina including Quba Mosque and Uhud Mountain.",
      "Day 9: Free day for personal worship and reflection in Medina.",
      "Day 10: Return journey. Transfer to airport and departure.",
    ],
    spiritualSignificance:
      "Omra is a sacred pilgrimage that offers Muslims the opportunity to renew their faith, seek forgiveness, and draw closer to Allah. Each step of the journey, from the Tawaf around the Kaaba to the Sa'i between Safa and Marwa, holds deep spiritual meaning and helps pilgrims connect with Islamic history and teachings. Our package is designed to enhance this spiritual experience by providing knowledgeable guides who explain the significance of each ritual and location, allowing you to fully immerse yourself in this blessed journey.",
    availableDates: ["2023-10-15", "2023-11-01", "2023-11-15", "2023-12-01", "2023-12-15", "2024-01-05", "2024-01-20"],
    hotelOptions: [
      {
        name: "Al Safwah Royale Orchid",
        type: "3-star",
        price: 100,
        description:
          "Comfortable accommodations within walking distance of the Masjid al-Haram. Enjoy modern amenities and a peaceful atmosphere for your spiritual journey. The hotel features clean rooms, reliable Wi-Fi, and a restaurant serving international cuisine.",
      },
      {
        name: "Swissotel Al Maqam Makkah",
        type: "4-star",
        price: 150,
        description:
          "Experience luxury and convenience with direct access to the Masjid al-Haram. Spacious rooms, excellent dining options, and top-notch services await you. The hotel offers a business center, fitness facilities, and multiple restaurants serving Middle Eastern and international dishes.",
      },
      {
        name: "Anjum Hotel Makkah",
        type: "5-star",
        price: 200,
        description:
          "Indulge in ultimate luxury and unparalleled views of the Holy Mosque. Exquisite dining, world-class amenities, and personalized service for a truly memorable Omra experience. The hotel features spacious suites, a spa, multiple dining venues, and exclusive prayer areas.",
      },
    ],
    transportOptions: [
      {
        type: "Economy",
        price: 500,
        description:
          "Comfortable seating and standard amenities for a pleasant journey to and from Mecca. Includes one checked bag, in-flight meals, and entertainment system.",
      },
      {
        type: "Business",
        price: 1000,
        description:
          "Enjoy extra legroom, priority boarding, and enhanced meal options for a more relaxed travel experience. Business class includes two checked bags, premium dining, lounge access, and priority check-in and boarding.",
      },
    ],
    additionalServices: [
      {
        name: "VIP Transport",
        price: 200,
        description:
          "Travel in comfort with private, air-conditioned vehicles for all your transportation needs during your stay. Includes dedicated driver and flexible scheduling to accommodate your personal worship times.",
      },
      {
        name: "Personal Guide",
        price: 300,
        description:
          "Benefit from the knowledge and assistance of an experienced guide throughout your Omra journey. Your personal guide will provide historical context, spiritual insights, and practical assistance with all rituals.",
      },
      {
        name: "Photography Service",
        price: 150,
        description:
          "Capture your spiritual journey with professional photography services, providing you with lasting memories of your Omra. Includes digital photos and a printed photo book delivered after your return.",
      },
      {
        name: "Extended Stay in Medina",
        price: 400,
        description:
          "Add three additional nights in Medina to your package, allowing more time for worship at the Prophet's Mosque and visits to historical sites. Includes hotel accommodation and transportation.",
      },
    ],
  },
  {
    id: 2,
    name: "Premium Omra Package",
    image: "/omra-premium.jpg",
    departureDate: "2023-11-01",
    duration: 14,
    hotel: "5-star hotel in Mecca and Medina",
    transport: "Business class flights",
    price: 3000,
    description:
      "Embark on a luxurious and spiritually enriching Omra journey with our premium package. Enjoy top-tier accommodations, personalized services, and an extended itinerary to make the most of your pilgrimage. This exclusive package offers a perfect balance of spiritual fulfillment and physical comfort, with special access to prayer areas, personalized guidance, and luxury accommodations close to the holy sites.",
    services: [
      "Express Visa Processing",
      "5-Star Accommodations",
      "Gourmet Halal Meals",
      "Private Transportation",
      "Personal Guide",
      "VIP Access to Sites",
      "Luxury Amenities",
      "Spiritual Workshops",
    ],
    itinerary: [
      "Day 1: VIP arrival in Jeddah. Private transfer to 5-star hotel in Mecca with express check-in.",
      "Day 2: Private orientation with scholar. Perform Umrah with personal guide at preferred time.",
      "Day 3: Extended Tawaf and Sa'i with detailed spiritual guidance. Evening lecture by renowned scholar.",
      "Day 4: Exclusive tour of historical sites in Mecca with private transportation.",
      "Day 5: Free day for personal worship with guide available on request.",
      "Day 6: Visit to Museum of the Two Holy Mosques with private access.",
      "Day 7: Spiritual reflection workshop and preparation for Medina visit.",
      "Day 8: Luxury transfer to Medina. Check-in at 5-star hotel near Prophet's Mosque.",
      "Day 9: Guided tour of Prophet's Mosque with special access areas.",
      "Day 10: Visit to historical battlefields and significant sites with expert historian.",
      "Day 11: Tour of Quba Mosque and other important locations in Medina.",
      "Day 12: Free day for personal worship and reflection in Medina.",
      "Day 13: Final day of worship and preparation for departure.",
      "Day 14: VIP transfer to airport and business class return journey.",
    ],
    spiritualSignificance:
      "Our premium Omra package offers an elevated spiritual experience, allowing pilgrims to focus deeply on their connection with Allah. With extended time in both Mecca and Medina, pilgrims have ample opportunity for prayer, reflection, and learning about Islamic history in the holiest sites of Islam. The package includes sessions with knowledgeable scholars who provide insights into the deeper meanings of the rituals and help pilgrims maximize the spiritual benefits of their journey. The comfortable accommodations and personalized service ensure that physical concerns are minimized, allowing for complete spiritual immersion.",
    availableDates: ["2023-11-01", "2023-11-15", "2023-12-01", "2023-12-15", "2024-01-10", "2024-01-25", "2024-02-05"],
    hotelOptions: [
      {
        name: "Raffles Makkah Palace",
        type: "5-star",
        price: 300,
        description:
          "Experience unparalleled luxury and breathtaking views of the Kaaba. Impeccable service, exquisite dining, and opulent accommodations await you. The hotel features spacious suites with private butler service, multiple fine dining restaurants, and exclusive prayer areas with direct views of the Kaaba.",
      },
      {
        name: "Hyatt Regency Makkah",
        type: "5-star",
        price: 350,
        description:
          "Enjoy a seamless blend of comfort and convenience with direct access to the Masjid al-Haram. Spacious rooms, world-class amenities, and exceptional service for a memorable stay. The hotel offers multiple restaurants, a business center, fitness facilities, and a dedicated prayer room.",
      },
      {
        name: "Dar Al Tawhid Intercontinental Makkah",
        type: "5-star",
        price: 400,
        description:
          "Immerse yourself in luxury and tranquility just steps away from the Holy Mosque. Elegant accommodations, fine dining, and personalized service for an unforgettable Omra experience. The hotel features spacious rooms with Kaaba views, multiple restaurants serving international cuisine, and exclusive facilities for pilgrims.",
      },
    ],
    transportOptions: [
      {
        type: "Business",
        price: 1500,
        description:
          "Travel in style and comfort with spacious seating, premium amenities, and priority service for a relaxing journey. Business class includes dedicated check-in, lounge access, gourmet dining, and fully reclining seats.",
      },
      {
        type: "First Class",
        price: 2500,
        description:
          "Indulge in the ultimate travel experience with luxurious seating, gourmet meals, and personalized attention throughout your journey. First class offers private suites, personalized service, exclusive lounge access, and the finest dining options.",
      },
    ],
    additionalServices: [
      {
        name: "Private Car Service",
        price: 500,
        description:
          "Enjoy the convenience and comfort of a private car service for all your transportation needs during your stay in Mecca and Medina. Includes luxury vehicle with professional driver available 24/7.",
      },
      {
        name: "Personal Concierge",
        price: 700,
        description:
          "Benefit from the expertise and assistance of a dedicated concierge to cater to your every need and ensure a seamless Omra experience. Your concierge will handle all arrangements, reservations, and special requests throughout your journey.",
      },
      {
        name: "Professional Photography Package",
        price: 300,
        description:
          "Preserve your cherished memories with a professional photography package, capturing the highlights of your spiritual journey in stunning detail. Includes a professional photographer for key moments, digital images, and a premium photo album.",
      },
      {
        name: "Exclusive Scholar Sessions",
        price: 400,
        description:
          "Engage in private sessions with renowned Islamic scholars who will provide deeper insights into the spiritual aspects of Omra and answer your personal questions. Includes five private sessions scheduled at your convenience.",
      },
    ],
  },
  {
    id: 3,
    name: "Family Omra Package",
    image: "/omra-family.jpg",
    departureDate: "2023-12-01",
    duration: 12,
    hotel: "4-star family suites in Mecca and Medina",
    transport: "Economy class flights with family seating",
    price: 2200,
    description:
      "Share the blessed experience of Omra with your loved ones through our specially designed family package. Featuring spacious accommodations, family-friendly activities, and special attention to the needs of children and elderly family members, this package ensures a meaningful pilgrimage for all generations. Our experienced guides are trained to work with families, providing age-appropriate explanations of rituals and historical sites.",
    services: [
      "Family Visa Processing",
      "Spacious Family Suites",
      "Child-Friendly Meals",
      "Family Transportation",
      "Educational Programs for Children",
      "Elderly Assistance",
      "Family Guide",
    ],
    itinerary: [
      "Day 1: Family arrival in Jeddah. Transfer to family-friendly hotel in Mecca.",
      "Day 2: Family orientation with age-appropriate explanations. Preparation for Umrah.",
      "Day 3: Perform Umrah as a family with specialized guidance for children and elderly.",
      "Day 4: Educational tour of Mecca for all family members with interactive elements for children.",
      "Day 5: Visit to historical sites with family-friendly explanations.",
      "Day 6: Free day for family worship and bonding activities.",
      "Day 7: Family workshop on Islamic traditions and values.",
      "Day 8: Transfer to Medina. Check-in at family-friendly hotel.",
      "Day 9: Guided family tour of Prophet's Mosque and surroundings.",
      "Day 10: Visit to historical sites in Medina with stories for children.",
      "Day 11: Free day for family worship and final shopping.",
      "Day 12: Family departure with special assistance for children and elderly members.",
    ],
    spiritualSignificance:
      "Performing Omra as a family strengthens spiritual bonds and creates lasting memories of shared devotion. This journey allows parents to teach their children about Islamic traditions firsthand, while children witness the faith in practice. The family package emphasizes the importance of passing religious values to the next generation, with special programs that make spiritual concepts accessible to younger pilgrims while still providing a profound experience for adults. Elderly family members can participate fully with our specialized assistance services.",
    availableDates: ["2023-12-01", "2023-12-20", "2024-01-15", "2024-02-10", "2024-03-01", "2024-03-15"],
    hotelOptions: [
      {
        name: "Jabal Omar Marriott Hotel",
        type: "4-star",
        price: 250,
        description:
          "Spacious family suites with connecting rooms, child-friendly amenities, and a convenient location near Masjid al-Haram. The hotel features a children's play area, family dining options with kids' menus, and rooms that can accommodate up to 6 family members.",
      },
      {
        name: "Hilton Suites Makkah",
        type: "4-star",
        price: 280,
        description:
          "Comfortable family accommodations with separate living areas, kitchenettes, and child safety features. Located within walking distance of the Holy Mosque, with special services for families including babysitting, children's activities, and family prayer areas.",
      },
      {
        name: "Mövenpick Hotel & Residences Makkah",
        type: "5-star",
        price: 320,
        description:
          "Luxury family apartments with multiple bedrooms, full kitchens, and spacious living areas. The hotel offers family-oriented services including children's programs, family dining options, and assistance for elderly family members.",
      },
    ],
    transportOptions: [
      {
        type: "Economy Family",
        price: 600,
        description:
          "Special family seating arrangements ensuring your family stays together throughout the journey. Includes extra baggage allowance for family necessities, priority boarding for families, and child-friendly meal options.",
      },
      {
        type: "Premium Economy Family",
        price: 900,
        description:
          "Enhanced comfort for families with extra legroom, priority services, and additional amenities for children. Features include dedicated family check-in, extra baggage allowance, premium family seating, and enhanced entertainment options for children.",
      },
    ],
    additionalServices: [
      {
        name: "Family Transportation Package",
        price: 350,
        description:
          "Private family van with car seats for children and easy access for elderly family members. Available for all local transportation needs throughout your stay.",
      },
      {
        name: "Children's Educational Program",
        price: 200,
        description:
          "Special workshops and activities designed to teach children about Omra and Islamic history in an engaging, age-appropriate manner. Includes educational materials, interactive sessions, and a certificate of completion.",
      },
      {
        name: "Elderly Assistance Service",
        price: 250,
        description:
          "Dedicated helpers for elderly family members during rituals and visits, including wheelchair assistance if needed. Our trained staff ensures elderly pilgrims can participate fully in all aspects of the pilgrimage with dignity and comfort.",
      },
      {
        name: "Family Memory Package",
        price: 300,
        description:
          "Professional photography and video service capturing your family's spiritual journey, plus a custom family journal for recording experiences. Includes a beautifully bound photo book and digital copies of all images.",
      },
    ],
  },
]

