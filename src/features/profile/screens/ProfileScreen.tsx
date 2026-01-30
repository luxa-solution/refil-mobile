import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { fontSize, ms, spacing } from '@/core/styles/responsive_scale';
import { MainLayoutComponent, ThemedText } from '@/shared/components';

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
  iconColor?: string;
  iconBgColor?: string;
}

function SettingItem({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  iconColor = '#0e2c8e',
  iconBgColor,
}: SettingItemProps) {
  const { theme } = useUnistyles();

  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={subtitle}>
      <View style={[styles.iconContainer, iconBgColor && { backgroundColor: iconBgColor }]}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color={theme.colors.textDefaultCaption} />
      )}
    </TouchableOpacity>
  );
}

interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

export function ProfileScreen() {
  const { theme } = useUnistyles();

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    // eslint-disable-next-line no-console
    console.log('Edit profile');
  };

  const handleDeliveryAddresses = () => {
    // Navigate to delivery addresses
    // eslint-disable-next-line no-console
    console.log('Delivery addresses');
  };

  const handlePaymentMethods = () => {
    // Navigate to payment methods
    // eslint-disable-next-line no-console
    console.log('Payment methods');
  };

  const handleNotifications = () => {
    // Navigate to notifications settings
    // eslint-disable-next-line no-console
    console.log('Notifications');
  };

  const handleSecurity = () => {
    // Navigate to security settings
    // eslint-disable-next-line no-console
    console.log('Security');
  };

  const handleLanguage = () => {
    // Navigate to language settings
    // eslint-disable-next-line no-console
    console.log('Language');
  };

  const handleTheme = () => {
    // Navigate to theme settings
    // eslint-disable-next-line no-console
    console.log('Theme');
  };

  const handleHelp = () => {
    // Navigate to help center
    // eslint-disable-next-line no-console
    console.log('Help');
  };

  const handleTerms = () => {
    // Navigate to terms
    // eslint-disable-next-line no-console
    console.log('Terms');
  };

  const handlePrivacy = () => {
    // Navigate to privacy policy
    // eslint-disable-next-line no-console
    console.log('Privacy');
  };

  const handleAbout = () => {
    // Navigate to about
    // eslint-disable-next-line no-console
    console.log('About');
  };

  const handleLogout = () => {
    // Handle logout
    // eslint-disable-next-line no-console
    console.log('Logout');
    // router.replace('/auth/login' as any);
  };

  return (
    <MainLayoutComponent backgroundColor="background" edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton} activeOpacity={0.7}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <ThemedText type="title" style={styles.profileName}>
              John Doe
            </ThemedText>
            <Text style={styles.profileEmail}>johndoe@example.com</Text>
            <Text style={styles.profilePhone}>(+234) 913-546-4740</Text>
          </View>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleEditProfile}
            activeOpacity={0.7}>
            <Ionicons name="create-outline" size={18} color={theme.colors.primaryDefault} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <SectionHeader title="ACCOUNT" />
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="location-outline"
              title="Delivery Addresses"
              subtitle="Manage your delivery locations"
              onPress={handleDeliveryAddresses}
              iconBgColor="#e8f4f8"
            />
            <SettingItem
              icon="card-outline"
              title="Payment Methods"
              subtitle="Manage your payment options"
              onPress={handlePaymentMethods}
              iconBgColor="#fff4e8"
            />
            <SettingItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Manage notification preferences"
              onPress={handleNotifications}
              iconBgColor="#f0e8ff"
            />
            <SettingItem
              icon="shield-checkmark-outline"
              title="Security"
              subtitle="Password and authentication"
              onPress={handleSecurity}
              iconBgColor="#e8ffe8"
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <SectionHeader title="PREFERENCES" />
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="language-outline"
              title="Language"
              subtitle="English"
              onPress={handleLanguage}
              iconBgColor="#ffe8f0"
            />
            <SettingItem
              icon="moon-outline"
              title="Theme"
              subtitle="Light mode"
              onPress={handleTheme}
              iconBgColor="#e8f0ff"
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <SectionHeader title="SUPPORT" />
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="help-circle-outline"
              title="Help Center"
              subtitle="Get help and support"
              onPress={handleHelp}
              iconBgColor="#fff8e8"
            />
            <SettingItem
              icon="document-text-outline"
              title="Terms of Service"
              onPress={handleTerms}
              iconBgColor="#e8fff8"
            />
            <SettingItem
              icon="lock-closed-outline"
              title="Privacy Policy"
              onPress={handlePrivacy}
              iconBgColor="#f8e8ff"
            />
            <SettingItem
              icon="information-circle-outline"
              title="About Refil"
              subtitle="Version 1.0.0"
              onPress={handleAbout}
              iconBgColor="#e8f8ff"
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Logout">
          <Ionicons name="log-out-outline" size={20} color="#c40000" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Refil Mobile v1.0.0</Text>
          <Text style={styles.footerText}>© 2026 Refil. All rights reserved.</Text>
        </View>
      </ScrollView>
    </MainLayoutComponent>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileHeader: {
    backgroundColor: theme.colors.surfaceDefault,
    padding: spacing(20),
    marginBottom: spacing(16),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderDefault,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: spacing(16),
    position: 'relative',
  },
  avatar: {
    width: ms(80),
    height: ms(80),
    borderRadius: ms(40),
    backgroundColor: theme.colors.primaryDefault,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.colors.surfaceSecondary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: ms(28),
    height: ms(28),
    borderRadius: ms(14),
    backgroundColor: theme.colors.primaryDefault,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surfaceDefault,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: spacing(16),
  },
  profileName: {
    fontSize: fontSize(20),
    fontWeight: '700',
    marginBottom: spacing(4),
  },
  profileEmail: {
    fontSize: fontSize(14),
    color: theme.colors.textDefaultBody,
    marginBottom: spacing(2),
  },
  profilePhone: {
    fontSize: fontSize(14),
    color: theme.colors.textDefaultCaption,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(6),
    paddingVertical: spacing(10),
    paddingHorizontal: spacing(16),
    backgroundColor: theme.colors.primaryDefaultSubtle,
    borderRadius: ms(10),
    borderWidth: 1,
    borderColor: theme.colors.primaryDefault,
    alignSelf: 'center',
  },
  editProfileText: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: theme.colors.primaryDefault,
  },
  section: {
    marginBottom: spacing(16),
  },
  sectionHeader: {
    fontSize: fontSize(12),
    fontWeight: '700',
    color: theme.colors.textDefaultCaption,
    paddingHorizontal: spacing(20),
    paddingVertical: spacing(8),
    letterSpacing: 0.5,
  },
  settingsGroup: {
    backgroundColor: theme.colors.surfaceDefault,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing(14),
    paddingHorizontal: spacing(20),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderDefault,
    minHeight: 60,
  },
  iconContainer: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: theme.colors.primaryDefaultSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing(12),
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: fontSize(15),
    fontWeight: '600',
    color: theme.colors.textDefaultHeading,
    marginBottom: spacing(2),
  },
  settingSubtitle: {
    fontSize: fontSize(13),
    color: theme.colors.textDefaultCaption,
    lineHeight: 18,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(8),
    paddingVertical: spacing(14),
    paddingHorizontal: spacing(20),
    marginHorizontal: spacing(20),
    marginVertical: spacing(16),
    backgroundColor: theme.colors.surfaceDefault,
    borderRadius: ms(12),
    borderWidth: 1,
    borderColor: '#c40000',
  },
  logoutText: {
    fontSize: fontSize(15),
    fontWeight: '700',
    color: '#c40000',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing(24),
    paddingHorizontal: spacing(20),
  },
  footerText: {
    fontSize: fontSize(12),
    color: theme.colors.textDefaultCaption,
    marginBottom: spacing(4),
  },
}));
