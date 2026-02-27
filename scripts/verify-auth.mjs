/**
 * MAKO DIVERS ADMIN - Supabase Auth Verification Script
 * Run this with: node scripts/verify-auth.mjs
 * 
 * This will tell you EXACTLY whether your credentials are valid
 * without any frontend complexity getting in the way.
 */

const SUPABASE_URL = "https://logewufqgmgxufkovpuw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZ2V3dWZxZ21neHVma292cHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NTE4OTksImV4cCI6MjA4MjMyNzg5OX0.RxqyoU3IXefl-a9XPtPiNZoxx21SzcFHuSO_h5vha0I";

// ====================================================
// ⚠️  SET YOUR CREDENTIALS HERE
// ====================================================
const TEST_EMAIL = "shadyosama658@gmail.com";
const TEST_PASSWORD = "YOUR_PASSWORD_HERE"; // <-- Replace with your actual password
// ====================================================

async function verifyCredentials() {
    console.log("🔍 MAKO DIVERS - Auth Verification");
    console.log("=====================================");
    console.log(`🌐 Supabase URL: ${SUPABASE_URL}`);
    console.log(`📧 Testing Email: ${TEST_EMAIL}`);
    console.log("");

    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
            email: TEST_EMAIL,
            password: TEST_PASSWORD
        })
    });

    const data = await response.json();

    if (response.ok && data.access_token) {
        console.log("✅ LOGIN SUCCESS!");
        console.log(`   User ID: ${data.user?.id}`);
        console.log(`   Email: ${data.user?.email}`);
        console.log(`   Email Confirmed: ${data.user?.email_confirmed_at ? "YES" : "NO"}`);
        console.log("");
        console.log("🎉 Your credentials are CORRECT. The frontend issue may be a cookie/session bug.");
    } else {
        console.error("❌ LOGIN FAILED");
        console.error(`   Error: ${data.error}`);
        console.error(`   Message: ${data.error_description || data.msg || "Unknown error"}`);
        console.error(`   Status: ${response.status}`);
        console.log("");

        if (data.error === "invalid_grant") {
            console.log("💡 DIAGNOSIS: The password you entered does not match the one stored in Supabase.");
            console.log("   SOLUTIONS:");
            console.log("   1. Go to Supabase Dashboard → Authentication → Users");
            console.log("   2. Find your user and use 'Send reset password email'");
            console.log("   3. OR: Update the user manually in the Supabase dashboard");
        }
    }
}

verifyCredentials().catch(console.error);
