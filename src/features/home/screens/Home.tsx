import { StyleSheet } from 'react-native-unistyles';

import {
  HomeHeader,
  NearbyStores,
  PromoCarousel,
  SearchBar,
  TopDistributors,
} from '@/features/home/components';
import { MainLayoutComponent } from '@/shared/components';

export function HomeScreen() {
  const handleLocationPress = () => {
    // TODO: Handle location selection
  };

  const handleProfilePress = () => {
    // TODO: Navigate to profile
  };

  const handleSearch = (text: string) => {
    // TODO: Implement search functionality
  };

  const handleFilterPress = () => {
    // TODO: Show filter options
  };

  const handleBannerPress = (index: number) => {
    // TODO: Handle banner press
  };

  const handleSeeAllDistributors = () => {
    // TODO: Navigate to all distributors
  };

  const handleDistributorPress = (distributor: any) => {
    // TODO: Navigate to distributor details
  };

  const handleSeeAllStores = () => {
    // TODO: Navigate to all stores
  };

  const handleStorePress = (store: any) => {
    // TODO: Navigate to store details
  };

  return (
    <MainLayoutComponent
      backgroundColor="background"
      showIndicator={false}
      edges={['top', 'bottom']}>
      {/* Header with location and profile */}
      <HomeHeader
        location="22, Off Tipper garage..."
        onLocationPress={handleLocationPress}
        onProfilePress={handleProfilePress}
      />

      {/* Search Bar */}
      <SearchBar
        placeholder="Search a station"
        onSearch={handleSearch}
        onFilterPress={handleFilterPress}
      />

      {/* Promo Carousel Banner */}
      <PromoCarousel onBannerPress={handleBannerPress} />

      {/* Top Distributors */}
      <TopDistributors
        onSeeAll={handleSeeAllDistributors}
        onDistributorPress={handleDistributorPress}
      />

      {/* Nearby Stores */}
      <NearbyStores onSeeAll={handleSeeAllStores} onStorePress={handleStorePress} />
    </MainLayoutComponent>
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
