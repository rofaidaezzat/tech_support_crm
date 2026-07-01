import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { store } from './app/store';
import { router } from './router';
import { AuthProvider } from './auth/context';
import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <LanguageProvider>
          <Toaster position="top-center" richColors />
          <RouterProvider router={router} />
        </LanguageProvider>
      </AuthProvider>
    </Provider>
  );
}
