const SUPABASE_URL = 'https://dtydgmmloeuenqjgubzc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_piiGOiTxMS98bwBsp9MCzQ_BXi0FdVt';

async function fetchData() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            
        }
    });
    const data = await response.json();
    console.log(data);
    // renderProducts(data);
    return data;

}

fetchData()