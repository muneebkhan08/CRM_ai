'use client';

import { useState, useEffect } from 'react';
import {
    User,
    Bell,
    Shield,
    Palette,
    Database,
    Mail,
    Key,
    Globe,
    Save,
    Check,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface SettingsSection {
    id: string;
    label: string;
    icon: React.ElementType;
}

const sections: SettingsSection[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Database },
];

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();
    const [activeSection, setActiveSection] = useState('profile');
    const [saved, setSaved] = useState(false);

    // Profile settings
    const [profile, setProfile] = useState({
        firstName: 'James',
        lastName: 'Passaquindici',
        email: 'jamespass@emi.com',
        phone: '+1 (555) 123-4567',
        company: 'EMI Technologies',
        role: 'Sales Manager',
    });

    // Notification settings
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: true,
        dealUpdates: true,
        taskReminders: true,
        weeklyReports: true,
        marketingEmails: false,
    });

    // Appearance settings - sync with actual theme
    const [appearance, setAppearance] = useState<{
        theme: 'light' | 'dark' | 'system';
        compactMode: boolean;
        showAnimations: boolean;
    }>({
        theme: theme,
        compactMode: false,
        showAnimations: true,
    });

    // Update appearance state when theme changes
    useEffect(() => {
        setAppearance(prev => ({ ...prev, theme }));
    }, [theme]);

    // Security settings
    const [security, setSecurity] = useState({
        twoFactorEnabled: false,
        sessionTimeout: '30',
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
        if (newTheme === 'light' || newTheme === 'dark') {
            if (newTheme !== theme) {
                toggleTheme();
            }
        }
        setAppearance({ ...appearance, theme: newTheme });
    };

    const renderProfileSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                        <input
                            type="text"
                            value={profile.firstName}
                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            className="input-field"
                            aria-label="First Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                        <input
                            type="text"
                            value={profile.lastName}
                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            className="input-field"
                            aria-label="Last Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="input-field pl-10"
                                aria-label="Email"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                        <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="input-field"
                            aria-label="Phone"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                        <input
                            type="text"
                            value={profile.company}
                            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                            className="input-field"
                            aria-label="Company"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                        <input
                            type="text"
                            value={profile.role}
                            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                            className="input-field"
                            aria-label="Role"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Photo</h3>
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <svg className="w-full h-full text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <div>
                        <button className="btn-secondary text-sm">Upload Photo</button>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationsSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                    {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications' },
                        { key: 'dealUpdates', label: 'Deal Updates', desc: 'Get notified when deals are updated' },
                        { key: 'taskReminders', label: 'Task Reminders', desc: 'Receive reminders for upcoming tasks' },
                        { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Get weekly summary reports' },
                        { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive product updates and tips' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications[item.key as keyof typeof notifications]}
                                    onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                                    className="sr-only peer"
                                    aria-label={item.label}
                                />
                                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 dark:peer-focus:ring-primary-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSecuritySection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                            <input type="password" placeholder="••••••••" className="input-field pl-10" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                        <input type="password" placeholder="••••••••" className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="input-field" />
                    </div>
                    <button className="btn-secondary">Change Password</button>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Enable 2FA</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={security.twoFactorEnabled}
                            onChange={(e) => setSecurity({ ...security, twoFactorEnabled: e.target.checked })}
                            className="sr-only peer"
                            aria-label="Enable Two-Factor Authentication"
                        />
                        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 dark:peer-focus:ring-primary-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Session</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Session Timeout</label>
                    <select
                        value={security.sessionTimeout}
                        onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                        className="input-field cursor-pointer"
                        title="Session timeout duration"
                        aria-label="Session timeout"
                    >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="never">Never</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderAppearanceSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                    {(['light', 'dark', 'system'] as const).map((themeOption) => (
                        <button
                            key={themeOption}
                            onClick={() => handleThemeChange(themeOption)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                                appearance.theme === themeOption
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                            <div className={`w-full h-16 rounded-lg mb-2 ${
                                themeOption === 'light' ? 'bg-white border border-gray-200' :
                                themeOption === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-white to-gray-800'
                            }`}></div>
                            <p className="text-sm font-medium capitalize text-gray-900 dark:text-white">{themeOption}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Display Options</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Compact Mode</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Reduce spacing for more content</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={appearance.compactMode}
                                onChange={(e) => setAppearance({ ...appearance, compactMode: e.target.checked })}
                                className="sr-only peer"
                                aria-label="Compact Mode"
                            />
                            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 dark:peer-focus:ring-primary-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Animations</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Enable UI animations and transitions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={appearance.showAnimations}
                                onChange={(e) => setAppearance({ ...appearance, showAnimations: e.target.checked })}
                                className="sr-only peer"
                                aria-label="Enable Animations"
                            />
                            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 dark:peer-focus:ring-primary-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderIntegrationsSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connected Services</h3>
                <div className="space-y-4">
                    {[
                        { name: 'Google Calendar', desc: 'Sync your tasks and meetings', connected: true, icon: '📅' },
                        { name: 'Slack', desc: 'Get notifications in Slack', connected: true, icon: '💬' },
                        { name: 'Mailchimp', desc: 'Sync your email campaigns', connected: false, icon: '📧' },
                        { name: 'Salesforce', desc: 'Import/export customer data', connected: false, icon: '☁️' },
                        { name: 'Zapier', desc: 'Connect with 5000+ apps', connected: false, icon: '⚡' },
                    ].map((integration) => (
                        <div key={integration.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{integration.icon}</span>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{integration.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{integration.desc}</p>
                                </div>
                            </div>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    integration.connected
                                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                                        : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                                }`}
                            >
                                {integration.connected ? 'Disconnect' : 'Connect'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Access</h3>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">API Key</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Use this key to access the GrowthCRM API</p>
                        </div>
                        <button className="btn-secondary text-sm">Generate New Key</button>
                    </div>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 p-3 bg-white dark:bg-gray-800 rounded-lg text-sm font-mono text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                            sk_live_••••••••••••••••••••••••••••
                        </code>
                        <button className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Copy API Key" aria-label="Copy API Key">
                            <Globe size={18} className="text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return renderProfileSection();
            case 'notifications':
                return renderNotificationsSection();
            case 'security':
                return renderSecuritySection();
            case 'appearance':
                return renderAppearanceSection();
            case 'integrations':
                return renderIntegrationsSection();
            default:
                return renderProfileSection();
        }
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account and preferences</p>
            </div>

            {/* Settings Layout */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <div className="md:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2 shadow-sm">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            const isActive = activeSection === section.id;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                        isActive
                                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-semibold'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <Icon size={20} className={isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'} />
                                    <span className="text-sm">{section.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                        {renderContent()}

                        {/* Save Button */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                            <button
                                onClick={handleSave}
                                className={`btn-primary flex items-center gap-2 ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            >
                                {saved ? (
                                    <>
                                        <Check size={18} />
                                        Saved!
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
