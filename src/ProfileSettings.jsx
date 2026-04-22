import { supabase } from './supabaseClient';

export default function ProfileSettings() {
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and will erase all your RSVPs/Events."
    );
    if (!confirmDelete) return;

    // Call the secure SQL function we just made
    const { error } = await supabase.rpc('delete_user');

    if (error) {
      console.error('Error deleting account:', error);
      setError(error.message);
    } else {
      // Log them out and send to home page
      await supabase.auth.signOut();
      navigate('/');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid red', marginTop: '20px' }}>
      <h3>GDPR Privacy Settings</h3>
      <p>Under GDPR, you have the right to be forgotten.</p>
      <button 
        onClick={handleDeleteAccount} 
        style={{ backgroundColor: 'red', color: 'white', padding: '10px', cursor: 'pointer' }}
      >
        Delete My Account & Data
      </button>
    </div>
  );
}