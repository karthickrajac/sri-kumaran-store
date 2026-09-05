const products = [
  // ==================== PULSES ====================

  {
    id: 1,
    name: "Green Gram",
    category: "Pulses",
    unit: "KG",
    mrp: 140,
    sellingPrice: 140,
    stock: 0,
    image: "/products/green-gram.png"
  },

  {
    id: 2,
    name: "Black Gram",
    category: "Pulses",
    unit: "KG",
    mrp: 150,
    sellingPrice: 150,
    stock: 0,
    image: "/products/black-gram.png"
  },

  {
    id: 3,
    name: "Toor Dal",
    category: "Pulses",
    unit: "KG",
    mrp: 180,
    sellingPrice: 180,
    stock: 0,
    image: "/products/toor-dal.png"
  },

  {
    id: 4,
    name: "Moong Dal",
    category: "Pulses",
    unit: "KG",
    mrp: 150,
    sellingPrice: 150,
    stock: 0,
    image: "/products/moong-dal.png"
  },

  {
    id: 5,
    name: "Masoor Dal",
    category: "Pulses",
    unit: "KG",
    mrp: 120,
    sellingPrice: 120,
    stock: 0,
    image: "/products/masoor-dal.png"
  },

  {
    id: 6,
    name: "Chana Dal",
    category: "Pulses",
    unit: "KG",
    mrp: 110,
    sellingPrice: 110,
    stock: 0,
    image: "/products/chana-dal.png"
  },

  {
    id: 7,
    name: "Rajma",
    category: "Pulses",
    unit: "KG",
    mrp: 160,
    sellingPrice: 160,
    stock: 0,
    image: "/products/rajma.png"
  },

  {
    id: 8,
    name: "Kabuli Chana",
    category: "Pulses",
    unit: "KG",
    mrp: 150,
    sellingPrice: 150,
    stock: 0,
    image: "/products/kabuli-chana.png"
  },

  {
    id: 9,
    name: "White Peas",
    category: "Pulses",
    unit: "KG",
    mrp: 110,
    sellingPrice: 110,
    stock: 0,
    image: "/products/white-peas.png"
  },

  {
    id: 10,
    name: "Black Chickpeas",
    category: "Pulses",
    unit: "KG",
    mrp: 120,
    sellingPrice: 120,
    stock: 0,
    image: "/products/black-chickpeas.png"
  },


  // ==================== RICE & GRAINS ====================

  {
    id: 11,
    name: "Rice",
    category: "Rice & Grains",
    unit: "KG",
    mrp: 70,
    sellingPrice: 70,
    stock: 0,
    image: "/products/rice.png"
  },

  {
    id: 12,
    name: "Ponni Rice",
    category: "Rice & Grains",
    unit: "KG",
    mrp: 75,
    sellingPrice: 75,
    stock: 0,
    image: "/products/ponni-rice.png"
  },

  {
    id: 13,
    name: "Idli Rice",
    category: "Rice & Grains",
    unit: "KG",
    mrp: 65,
    sellingPrice: 65,
    stock: 0,
    image: "/products/idli-rice.png"
  },

  {
    id: 15,
    name: "Basmati Rice",
    category: "Rice & Grains",
    unit: "KG",
    mrp: 130,
    sellingPrice: 130,
    stock: 0,
    image: "/products/basmati-rice.png"
  },

  {
    id: 17,
    name: "Ragi",
    category: "Rice & Grains",
    unit: "KG",
    mrp: 70,
    sellingPrice: 70,
    stock: 0,
    image: "/products/ragi.png"
  },

  {
    id: 18,
    name: "Bajra",
    category: "Rice & Grains",
    unit: "KG",
    mrp: 65,
    sellingPrice: 65,
    stock: 0,
    image: "/products/bajra.png"
  },

  {
    id: 19,
    name: "Jowar",
    category: "Rice & Grains",
    unit: "KG",
    mrp: 70,
    sellingPrice: 70,
    stock: 0,
    image: "/products/jowar.png"
  },

  {
    id: 20,
    name: "Corn",
    category: "Rice & Grains",
    unit: "KG",
    mrp: 55,
    sellingPrice: 55,
    stock: 0,
    image: "/products/corn.png"
  },


  // ==================== COOKING OIL ====================

  {
    id: 99,
    name: "Gold Winner Oil",
    category: "Cooking Oil",
    unit: "LITRE",
    mrp: 170,
    sellingPrice: 170,
    stock: 0,
    image: "/products/gold-winner-oil.png"
  },

  {
    id: 100,
    name: "Sunflower Oil",
    category: "Cooking Oil",
    unit: "LITRE",
    mrp: 165,
    sellingPrice: 165,
    stock: 0,
    image: "/products/sunflower-oil.png"
  },

  {
    id: 102,
    name: "Saffola Gold",
    category: "Cooking Oil",
    unit: "LITRE",
    mrp: 190,
    sellingPrice: 190,
    stock: 0,
    image: "/products/saffola-gold.png"
  },

  {
    id: 103,
    name: "Groundnut Oil",
    category: "Cooking Oil",
    unit: "LITRE",
    mrp: 190,
    sellingPrice: 190,
    stock: 0,
    image: "/products/groundnut-oil.png"
  },


  // ==================== DAIRY ====================

  {
    id: 108,
    name: "Ghee",
    category: "Dairy",
    unit: "KG",
    mrp: 650,
    sellingPrice: 650,
    stock: 0,
    image: "/products/ghee.png"
  },

  {
    id: 109,
    name: "Aavin Milk",
    category: "Dairy",
    unit: "LITRE",
    mrp: 60,
    sellingPrice: 60,
    stock: 0,
    image: "/products/aavin-milk.png"
  },

  {
    id: 111,
    name: "Butter",
    category: "Dairy",
    unit: "KG",
    mrp: 600,
    sellingPrice: 600,
    stock: 0,
    image: "/products/butter.png"
  },

  {
    id: 112,
    name: "Paneer",
    category: "Dairy",
    unit: "KG",
    mrp: 400,
    sellingPrice: 400,
    stock: 0,
    image: "/products/paneer.png"
  },


  // ==================== BISCUITS ====================

  {
    id: 114,
    name: "Parle-G",
    category: "Biscuits",
    unit: "PACK",
    mrp: 10,
    sellingPrice: 10,
    stock: 0,
    image: "/products/parle-g.png"
  },

  {
    id: 115,
    name: "Marie Gold",
    category: "Biscuits",
    unit: "PACK",
    mrp: 10,
    sellingPrice: 10,
    stock: 0,
    image: "/products/marie-gold.png"
  },

  {
    id: 116,
    name: "Good Day",
    category: "Biscuits",
    unit: "PACK",
    mrp: 20,
    sellingPrice: 20,
    stock: 0,
    image: "/products/good-day.png"
  },

  {
    id: 118,
    name: "Hide & Seek",
    category: "Biscuits",
    unit: "PACK",
    mrp: 30,
    sellingPrice: 30,
    stock: 0,
    image: "/products/hide-seek.png"
  },

  {
    id: 126,
    name: "Oreo",
    category: "Biscuits",
    unit: "PACK",
    mrp: 40,
    sellingPrice: 40,
    stock: 0,
    image: "/products/oreo.png"
  },


  // ==================== SNACKS ====================

  {
    id: 129,
    name: "Lays Classic",
    category: "Snacks",
    unit: "PACK",
    mrp: 20,
    sellingPrice: 20,
    stock: 0,
    image: "/products/lays-classic.png"
  },

  {
    id: 130,
    name: "Lays Magic Masala",
    category: "Snacks",
    unit: "PACK",
    mrp: 20,
    sellingPrice: 20,
    stock: 0,
    image: "/products/lays-magic-masala.png"
  },

  {
    id: 131,
    name: "Kurkure",
    category: "Snacks",
    unit: "PACK",
    mrp: 20,
    sellingPrice: 20,
    stock: 0,
    image: "/products/kurkure.png"
  },

  {
    id: 134,
    name: "Mixture",
    category: "Snacks",
    unit: "KG",
    mrp: 250,
    sellingPrice: 250,
    stock: 0,
    image: "/products/mixture.png"
  },


  // ==================== BEVERAGES ====================

  {
    id: 140,
    name: "Coca-Cola",
    category: "Beverages",
    unit: "BOTTLE",
    mrp: 40,
    sellingPrice: 40,
    stock: 0,
    image: "/products/coca-cola.png"
  },

  {
    id: 141,
    name: "Pepsi",
    category: "Beverages",
    unit: "BOTTLE",
    mrp: 40,
    sellingPrice: 40,
    stock: 0,
    image: "/products/pepsi.png"
  },

  {
    id: 142,
    name: "Sprite",
    category: "Beverages",
    unit: "BOTTLE",
    mrp: 40,
    sellingPrice: 40,
    stock: 0,
    image: "/products/sprite.png"
  },

  {
    id: 143,
    name: "Fanta",
    category: "Beverages",
    unit: "BOTTLE",
    mrp: 40,
    sellingPrice: 40,
    stock: 0,
    image: "/products/fanta.png"
  },

  {
    id: 147,
    name: "Frooti",
    category: "Beverages",
    unit: "PACK",
    mrp: 10,
    sellingPrice: 10,
    stock: 0,
    image: "/products/frooti.png"
  },


  // ==================== HEALTH & WELLNESS ====================

  {
    id: 166,
    name: "Dabur Honey",
    category: "Health & Wellness",
    unit: "BOTTLE",
    mrp: 220,
    sellingPrice: 220,
    stock: 0,
    image: "/products/dabur-honey.png"
  },


  // ==================== PERSONAL CARE ====================

  {
    id: 169,
    name: "Colgate Strong Teeth",
    category: "Personal Care",
    unit: "PACK",
    mrp: 110,
    sellingPrice: 110,
    stock: 0,
    image: "/products/colgate-strong-teeth.png"
  },

  {
    id: 170,
    name: "Colgate MaxFresh",
    category: "Personal Care",
    unit: "PACK",
    mrp: 120,
    sellingPrice: 120,
    stock: 0,
    image: "/products/colgate-maxfresh.png"
  },

  {
    id: 171,
    name: "Closeup",
    category: "Personal Care",
    unit: "PACK",
    mrp: 110,
    sellingPrice: 110,
    stock: 0,
    image: "/products/closeup.png"
  },

  {
    id: 197,
    name: "Clinic Plus",
    category: "Personal Care",
    unit: "BOTTLE",
    mrp: 180,
    sellingPrice: 180,
    stock: 0,
    image: "/products/clinic-plus.png"
  },


  // ==================== CLEANING ====================

  {
    id: 175,
    name: "Harpic",
    category: "Cleaning",
    unit: "BOTTLE",
    mrp: 110,
    sellingPrice: 110,
    stock: 0,
    image: "/products/harpic.png"
  },

  {
    id: 176,
    name: "Lizol",
    category: "Cleaning",
    unit: "BOTTLE",
    mrp: 120,
    sellingPrice: 120,
    stock: 0,
    image: "/products/lizol.png"
  },

  {
    id: 177,
    name: "Vim Liquid",
    category: "Cleaning",
    unit: "BOTTLE",
    mrp: 120,
    sellingPrice: 120,
    stock: 0,
    image: "/products/vim-liquid.png"
  },


  // ==================== HOUSEHOLD ====================

  {
    id: 299,
    name: "Broom",
    category: "Household",
    unit: "PIECE",
    mrp: 100,
    sellingPrice: 100,
    stock: 0,
    image: "/products/broom.png"
  },

  {
    id: 301,
    name: "Bucket",
    category: "Household",
    unit: "PIECE",
    mrp: 180,
    sellingPrice: 180,
    stock: 0,
    image: "/products/bucket.png"
  }
];

export default products;