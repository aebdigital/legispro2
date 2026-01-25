import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ngifengeshwvyzhqvprn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5naWZlbmdlc2h3dnl6aHF2cHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5Mjk0NzcsImV4cCI6MjA4MDUwNTQ3N30.VgFpOYFfnqQWrWke5U0HAt1OkYHQHiIzkk2MRBYGD8c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
