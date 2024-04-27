import { createClient } from '@supabase/supabase-js'

const URL = 'https://uybeqnqbgabpibtcrqaj.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5YmVxbnFiZ2FicGlidGNycWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDE5MzUsImV4cCI6MjAyOTQ3NzkzNX0.7Pc8-xsaAruJMhYq4iwV6OMZu-gw_2yqoL_TYt0F5HA';

export const supabase = createClient(URL, API_KEY);