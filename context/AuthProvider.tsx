import { AuthContext } from './AuthContext';
import { useState, ReactNode } from 'react';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

// Mock user database (in real app, this would be on backend)
const MOCK_USERS = [
    {
      id: '1',
      email: 'demo@jits.co.za',
      password: 'password123',
      name: 'Jits Fan',
      avatar: undefined
    },
    {
      id: '2',
      email: 'user@example.com',
      password: 'demo',
      name: 'Cool User',
      avatar: undefined
    }
];

  
export function AuthProvider({ children }: { children: ReactNode }) {
    // Initialize user state from localStorage using lazy initialization
    const [user, setUser] = useState<User | null>(() => {
      const savedUser = localStorage.getItem('jits-user');
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (error) {
          console.error('Failed to parse saved user', error);
          localStorage.removeItem('jits-user');
        }
      }
      return null;
    });
    const [isLoading] = useState(false);
  
    // Mock login function (replace with real API call to your C# .NET backend)
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
  
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
  
      if (mockUser) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = mockUser;
        setUser(userWithoutPassword);
        localStorage.setItem('jits-user', JSON.stringify(userWithoutPassword));
        return { success: true };
      }
      
      return { success: false, error: 'Invalid email or password' };
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('jits-user');
    };
  
    const updateProfile = (updates: Partial<User>) => {
      if (!user) return;
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('jits-user', JSON.stringify(updatedUser));
    };
  
    return (
      <AuthContext.Provider value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateProfile
      }}>
        {children}
      </AuthContext.Provider>
    );
  }