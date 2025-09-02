Weecom Product Dashboard - ZIP (Supabase + DummyJSON scaffold)

Instructions:
1. unzip this folder
2. cd wecom_product_dashboard
3. copy .env.example to .env and fill:
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_KEY=your_anon_public_key
4. npm install
5. npm run dev
6. Open http://localhost:5173

Notes:
- DummyJSON (https://dummyjson.com) is used for public product reads.
- Supabase is used for persistent CRUD (set up 'products' table in your Supabase project).
- This scaffold is minimal and intended as a starting point. Add RLS policies, Auth flows, and tests as needed.
