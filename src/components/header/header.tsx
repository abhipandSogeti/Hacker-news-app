import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { ModeToggle } from '../mode-toggle/mode-toggle';
import { SquareIcon } from 'lucide-react';
import { useTheme } from '../theme-provider/theme-provider';
import { NavLink } from "react-router-dom";

const navigation = [
  { name: 'New Stories', href: '/stories/new' },
  { name: 'Top Stories', href: '/stories/top' },
  { name: 'Best Stories', href: '/stories/best' },
  { name: 'Ask HN', href: '/stories/ask' },
  { name: 'Show HN', href: '/stories/show' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <Disclosure as="nav" className={classNames(isDarkTheme ? 'bg-gray-800' : 'bg-gray-200')}>
      <div className="mx-auto sm:px-6 lg:px-16">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-orange-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:text-orange-500">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <SquareIcon className="h-8 w-8 text-orange-500">
                <text x="50%" y="50%" textAnchor="middle" fill="white" dy=".3em">HN</text>
              </SquareIcon>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                        isDarkTheme ? 'bg-gray-800 text-orange-500' : 'bg-gray-200 text-orange-500'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ModeToggle />
            <NavLink to="/admin/management" className="p-1 text-orange-500 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Login</span>
              <UserIcon className="h-6 w-6" aria-hidden="true" />
            </NavLink>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                'block rounded-md px-3 py-2 text-base font-medium',
                'text-orange-500 hover:bg-gray-700 hover:text-orange-500'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
