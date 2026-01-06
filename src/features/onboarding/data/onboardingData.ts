export type OnboardingSlide = {
  id: number;
  title: string;
  description: string;
  imgsrc: any;
  imgPos: 'top' | 'middle';
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Seamless Deliveries, Right When You Need Them',
    description: 'Manage your deliveries with ease using our app.',
    imgsrc: require('../../../../assets/images/onboarding/bikeman.png'),
    imgPos: 'top' as const,
  },
  {
    id: 2,
    title: 'Track Every Delivery in Real Time',
    description: 'Get instant updates from pickup to doorstep.',
    imgsrc: require('../../../../assets/images/onboarding/bikeman.png'),
    imgPos: 'top' as const,
  },
  {
    id: 3,
    title: 'Safe, Trusted & Verified Riders',
    description: 'Your gas refills are handled very carefully.',
    imgsrc: require('../../../../assets/images/onboarding/bikeman.png'),
    imgPos: 'top' as const,
  },
];
