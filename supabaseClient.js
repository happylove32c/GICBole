
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kootbjjmjxurjwkvajdy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvb3Riamptanh1cmp3a3ZhamR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MjIzNzksImV4cCI6MjA1NzQ5ODM3OX0.iYkkvICXnp7GLw0X7-RuTqJAdsduH2_wxwhmsgQJcwI'
const supabase = createClient(supabaseUrl, supabaseKey)