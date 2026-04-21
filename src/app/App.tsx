import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { store } from './store';
import { router } from './routes';
import { AuthProvider } from '../auth/context';
import { TenantProvider } from '../tenants/context';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <TenantProvider>
          <RouterProvider router={router} />
        </TenantProvider>
      </AuthProvider>
    </Provider>
  );
}
