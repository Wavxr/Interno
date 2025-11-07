import { useState } from 'react';
import { LogIn, Loader2 } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
            <LogIn className="h-7 w-7 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Interno</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all backdrop-blur-sm"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all backdrop-blur-sm"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 backdrop-blur-sm">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-950 transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                Signing in...
              </>
            ) : (
              <>
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
