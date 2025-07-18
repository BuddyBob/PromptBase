// Test script to verify database setup
import { supabase } from './src/lib/supabase.js'

async function testDatabaseSetup() {
  console.log('Testing database setup...')

  try {
    // Test 1: Check if essays table exists and has the right structure
    console.log('\n1. Testing essays table...')
    const { data: essays, error: essaysError } = await supabase
      .from('essays')
      .select('*')
      .limit(1)
    
    if (essaysError) {
      console.error('❌ Essays table error:', essaysError.message)
    } else {
      console.log('✅ Essays table accessible')
    }

    // Test 2: Check if likes table exists
    console.log('\n2. Testing likes table...')
    const { data: likes, error: likesError } = await supabase
      .from('likes')
      .select('*')
      .limit(1)
    
    if (likesError) {
      console.error('❌ Likes table error:', likesError.message)
    } else {
      console.log('✅ Likes table accessible')
    }

    // Test 3: Check if saved_essays table exists
    console.log('\n3. Testing saved_essays table...')
    const { data: savedEssays, error: savedError } = await supabase
      .from('saved_essays')
      .select('*')
      .limit(1)
    
    if (savedError) {
      console.error('❌ Saved essays table error:', savedError.message)
    } else {
      console.log('✅ Saved essays table accessible')
    }

    // Test 4: Check authentication
    console.log('\n4. Testing authentication...')
    const { data: session, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      console.error('❌ Auth error:', authError.message)
    } else if (session?.session) {
      console.log('✅ User is logged in:', session.session.user.email)
    } else {
      console.log('⚠️ No user logged in')
    }

  } catch (error) {
    console.error('❌ General error:', error.message)
  }
}

testDatabaseSetup()
