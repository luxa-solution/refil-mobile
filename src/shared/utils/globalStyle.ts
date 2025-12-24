import { DimensionValue, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';
import {
  ms as moderateScale,
  wp as scale,
  hp as verticalScale,
} from '../../core/styles/responsive_scale';

// export const { width, height } = Dimensions.get("window");
export const { width, height } = UnistylesRuntime.screen;
export type styleType = ViewStyle | TextStyle | ImageStyle;
const globalStyle = StyleSheet.create((theme, rt) => ({
  underline: {
    textDecorationLine: 'underline',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  inputHeight: {
    height: scale(42),
  },
  inpuMultiHeight: {
    height: scale(84),
  },
  dot: {
    width: scale(6),
    height: scale(6),
    marginHorizontal: scale(6),
    borderRadius: scale(20),
  },
  billsICon: {
    width: scale(30),
    height: scale(30),
  },
  sideWidth: {
    width: scale(5),
  },

  apiToast: {
    position: 'absolute',
    top: scale(40),
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    zIndex: 1000,
  },
  flexrow: {
    flexDirection: 'row',
  },
  flexrowReverse: {
    flexDirection: 'row-reverse',
  },
  zIndex: {
    zIndex: 30,
  },
  flexwrap: {
    flexWrap: 'wrap',
  },
  borderWidth1: {
    borderWidth: scale(1),
  },
  borderWidth2: {
    borderWidth: scale(2),
  },
  br: {
    borderRadius: scale(500),
  },
  borderRadius: {
    borderRadius: scale(8),
  },
  borderRadius2: {
    borderRadius: scale(2),
  },
  borderRadius4: {
    borderRadius: scale(4),
  },
  borderRadius6: {
    borderRadius: scale(6),
  },
  borderRadius8: {
    borderRadius: scale(8),
  },
  borderRadius16: {
    borderRadius: scale(16),
  },
  borderRadius12: {
    borderRadius: scale(12),
  },
  borderRadius24: {
    borderRadius: scale(24),
  },
  borderRadius32: {
    borderRadius: scale(32),
  },
  borderRad: {
    borderRadius: scale(8),
  },
  modalBr: {
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
  },
  modalBrBottom: {
    borderBottomLeftRadius: scale(16),
    borderBottomRightRadius: scale(16),
  },
  bottomBr: {
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
  },
  toastBr: {
    borderBottomRightRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  relative: {
    position: 'relative',
  },
  gap2: {
    gap: scale(2),
  },
  gap4: {
    gap: scale(4),
  },
  gap8: {
    gap: scale(8),
  },
  gap12: {
    gap: scale(12),
  },
  gap16: {
    gap: scale(16),
  },
  gap24: {
    gap: scale(24),
  },
  gap32: {
    gap: scale(32),
  },
  gap40: {
    gap: scale(40),
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsEnd: {
    alignItems: 'flex-end',
  },
  alignItemsBaseline: {
    alignItems: 'baseline',
  },
  ppHeight: {
    height: scale(250),
  },
  absolute: {
    position: 'absolute',
  },
  flexOne: {
    flex: 1,
  },
  mx2p2: {
    marginHorizontal: '22@vs' as DimensionValue,
  },
  mt0p4: {
    marginTop: verticalScale(4) as DimensionValue,
  },
  mt0p5: {
    marginTop: verticalScale(5) as DimensionValue,
  },
  mt0p8: {
    marginTop: verticalScale(8) as DimensionValue,
  },
  mt1: {
    marginTop: verticalScale(10) as DimensionValue,
  },
  mt1p2: {
    marginTop: verticalScale(12) as DimensionValue,
  },
  mt1p5: {
    marginTop: verticalScale(15) as DimensionValue,
  },
  mt1p6: {
    marginTop: verticalScale(16) as DimensionValue,
  },
  mt2: {
    marginTop: verticalScale(20) as DimensionValue,
  },
  mt2p4: {
    marginTop: verticalScale(24) as DimensionValue,
  },
  mt3: {
    marginTop: verticalScale(30) as DimensionValue,
  },
  mt3p2: {
    marginTop: '32@vs' as DimensionValue,
  },
  mt4: {
    marginTop: verticalScale(40) as DimensionValue,
  },
  mt5: {
    marginTop: verticalScale(50) as DimensionValue,
  },
  mt6: {
    marginTop: verticalScale(60) as DimensionValue,
  },
  mt7: {
    marginTop: verticalScale(70) as DimensionValue,
  },
  mt8: {
    marginTop: verticalScale(80) as DimensionValue,
  },
  mt9: {
    marginTop: verticalScale(90) as DimensionValue,
  },
  mt10: {
    marginTop: verticalScale(100) as DimensionValue,
  },
  ml0p3: {
    marginLeft: '3@ms' as DimensionValue,
  },
  ml0p4: {
    marginLeft: scale(4) as DimensionValue,
  },
  ml0p5: {
    marginLeft: moderateScale(5) as DimensionValue,
  },
  ml0p8: {
    marginLeft: moderateScale(8) as DimensionValue,
  },
  ml1: {
    marginLeft: moderateScale(10) as DimensionValue,
  },
  ml1p2: {
    marginLeft: moderateScale(12) as DimensionValue,
  },
  ml2: {
    marginLeft: moderateScale(20) as DimensionValue,
  },
  ml2p4: {
    marginLeft: moderateScale(24) as DimensionValue,
  },
  ml3: {
    marginLeft: moderateScale(30) as DimensionValue,
  },
  ml4: {
    marginLeft: moderateScale(40) as DimensionValue,
  },
  ml5: {
    marginLeft: moderateScale(50) as DimensionValue,
  },
  ml6: {
    marginLeft: moderateScale(60) as DimensionValue,
  },
  ml7: {
    marginLeft: moderateScale(70) as DimensionValue,
  },
  ml8: {
    marginLeft: moderateScale(80) as DimensionValue,
  },
  ml9: {
    marginLeft: moderateScale(90) as DimensionValue,
  },
  ml10: {
    marginLeft: moderateScale(100) as DimensionValue,
  },
  p0p1: {
    padding: '1@s' as DimensionValue,
  },
  p0p2: {
    padding: scale(2) as DimensionValue,
  },
  p0p3: {
    padding: scale(3) as DimensionValue,
  },
  p0p4: {
    padding: scale(4) as DimensionValue,
  },
  p0p5: {
    padding: scale(5) as DimensionValue,
  },
  p0p6: {
    padding: scale(6) as DimensionValue,
  },
  p0p7: {
    padding: scale(7) as DimensionValue,
  },
  p0p8: {
    padding: scale(8) as DimensionValue,
  },
  p1: {
    padding: scale(10) as DimensionValue,
  },
  p1p5: {
    padding: '15@s' as DimensionValue,
  },
  p1p2: {
    padding: scale(12) as DimensionValue,
  },
  p1p6: {
    padding: scale(16) as DimensionValue,
  },
  p2: {
    padding: scale(20) as DimensionValue,
  },
  p2p4: {
    padding: scale(24) as DimensionValue,
  },
  p3: {
    padding: scale(30) as DimensionValue,
  },
  p4: {
    padding: scale(40) as DimensionValue,
  },
  p5: {
    padding: scale(50) as DimensionValue,
  },
  p6: {
    padding: scale(60) as DimensionValue,
  },
  p7: {
    padding: scale(70) as DimensionValue,
  },
  p8: {
    padding: scale(80) as DimensionValue,
  },
  p9: {
    padding: scale(90) as DimensionValue,
  },
  p10: {
    padding: scale(100),
  },
  pr0p4: {
    paddingRight: scale(4),
  },
  pr0p5: {
    paddingRight: moderateScale(5),
  },
  pr0p6: {
    paddingRight: moderateScale(6),
  },
  pr0p8: {
    paddingRight: moderateScale(8),
  },
  pr1: {
    paddingRight: moderateScale(10),
  },
  pr1p2: {
    paddingRight: moderateScale(12),
  },
  pr1p6: {
    paddingRight: moderateScale(16),
  },
  pr2: {
    paddingRight: moderateScale(20),
  },
  pr2p4: {
    paddingRight: moderateScale(24),
  },
  pr3: {
    paddingRight: moderateScale(30),
  },
  pr4: {
    paddingRight: moderateScale(40),
  },
  pr5: {
    paddingRight: moderateScale(50),
  },
  pr6: {
    paddingRight: moderateScale(60),
  },
  pr7: {
    paddingRight: moderateScale(70),
  },
  pr8: {
    paddingRight: moderateScale(80),
  },
  pr9: {
    paddingRight: moderateScale(90),
  },
  pr10: {
    paddingRight: moderateScale(100),
  },
  pl0p4: {
    paddingLeft: scale(4),
  },
  pl0p5: {
    paddingLeft: scale(5),
  },
  pl0p6: {
    paddingLeft: scale(6),
  },
  pl0p8: {
    paddingLeft: scale(8),
  },
  pl1: {
    paddingLeft: scale(10),
  },
  pl1p2: {
    paddingLeft: scale(12),
  },
  pl1p6: {
    paddingLeft: scale(16),
  },
  pl2: {
    paddingLeft: scale(20),
  },
  pl2p4: {
    paddingLeft: scale(24),
  },
  pl3: {
    paddingLeft: scale(30),
  },
  pl4: {
    paddingLeft: scale(40),
  },
  pl5: {
    paddingLeft: scale(50),
  },
  pl6: {
    paddingLeft: scale(60),
  },
  pl7: {
    paddingLeft: scale(70),
  },
  pl8: {
    paddingLeft: scale(80),
  },
  pl9: {
    paddingLeft: scale(90),
  },
  pl10: {
    paddingLeft: scale(100),
  },
  pb0p3: {
    paddingBottom: scale(3),
  },
  pb0p8: {
    paddingBottom: scale(8),
  },
  pb1: {
    paddingBottom: scale(10),
  },
  pb1p2: {
    paddingBottom: scale(12),
  },
  pb1p6: {
    paddingBottom: scale(16),
  },
  pb2: {
    paddingBottom: scale(20),
  },
  pb2p4: {
    paddingBottom: scale(24),
  },
  pb3: {
    paddingBottom: scale(30),
  },
  pb4: {
    paddingBottom: scale(40),
  },
  pb5: {
    paddingBottom: scale(50),
  },
  pb6: {
    paddingBottom: scale(60),
  },
  pb7: {
    paddingBottom: scale(70),
  },
  pb8: {
    paddingBottom: scale(80),
  },
  pb9: {
    paddingBottom: scale(90),
  },
  pb10: {
    paddingBottom: scale(100),
  },
  pb11: {
    paddingBottom: scale(110),
  },
  pb124: {
    paddingBottom: scale(124),
  },
  pb136: {
    paddingBottom: scale(136),
  },

  px0: {
    paddingHorizontal: scale(0),
  },
  px0p2: {
    paddingHorizontal: verticalScale(2),
  },
  px0p4: {
    paddingHorizontal: scale(4),
  },
  px0p5: {
    paddingHorizontal: moderateScale(5),
  },
  px0p8: {
    paddingHorizontal: moderateScale(8),
  },
  px1: {
    paddingHorizontal: moderateScale(10),
  },
  px12: {
    paddingHorizontal: moderateScale(12),
  },
  px16: {
    paddingHorizontal: moderateScale(16),
  },
  px1p2: {
    paddingHorizontal: moderateScale(12),
  },
  px1p5: {
    paddingHorizontal: verticalScale(15),
  },
  px1p6: {
    paddingHorizontal: moderateScale(16),
  },
  px2: {
    paddingHorizontal: moderateScale(20),
  },
  px2p4: {
    paddingHorizontal: moderateScale(24),
  },
  px3: {
    paddingHorizontal: moderateScale(30),
  },
  px4: {
    paddingHorizontal: moderateScale(40),
  },
  px5: {
    paddingHorizontal: moderateScale(50),
  },
  px6: {
    paddingHorizontal: moderateScale(60),
  },
  px7: {
    paddingHorizontal: moderateScale(70),
  },
  px8: {
    paddingHorizontal: moderateScale(80),
  },
  px9: {
    paddingHorizontal: moderateScale(90),
  },
  px10: {
    paddingHorizontal: moderateScale(100),
  },
  py0p2: {
    paddingVertical: verticalScale(2),
  },
  py0p4: {
    paddingVertical: verticalScale(4),
  },
  py0p5: {
    paddingVertical: verticalScale(5),
  },
  py0p6: {
    paddingVertical: verticalScale(6),
  },
  py0p8: {
    paddingVertical: verticalScale(8),
  },
  py1p2: {
    paddingVertical: verticalScale(12),
  },
  py1: {
    paddingVertical: verticalScale(10),
  },
  py0: {
    paddingVertical: verticalScale(0),
  },
  py1p6: {
    paddingVertical: verticalScale(16),
  },
  py1p5: {
    paddingVertical: verticalScale(15),
  },
  py2: {
    paddingVertical: verticalScale(20),
  },
  py2p4: {
    paddingVertical: verticalScale(24),
  },
  py3: {
    paddingVertical: verticalScale(30),
  },
  py4: {
    paddingVertical: verticalScale(40),
  },
  py5: {
    paddingVertical: verticalScale(50),
  },
  py6: {
    paddingVertical: verticalScale(60),
  },
  py7: {
    paddingVertical: verticalScale(70),
  },
  py8: {
    paddingVertical: verticalScale(80),
  },
  py9: {
    paddingVertical: verticalScale(90),
  },
  py10: {
    paddingVertical: verticalScale(100),
  },
  pt30p: {
    paddingTop: '30%',
  },
  ptStatus: {
    paddingTop: rt.statusBar.height + 60,
  },
  pt0p2: {
    paddingTop: verticalScale(2),
  },
  pt0p4: {
    paddingTop: verticalScale(4),
  },
  pt0p8: {
    paddingTop: verticalScale(8),
  },
  pt1: {
    paddingTop: verticalScale(10),
  },
  pt1p2: {
    paddingTop: verticalScale(12),
  },
  pt1p5: {
    paddingTop: verticalScale(15),
  },
  pt1p4: {
    paddingTop: verticalScale(14),
  },
  pt1p6: {
    paddingTop: verticalScale(16),
  },
  pt2: {
    paddingTop: verticalScale(20),
  },
  pt2p1: {
    paddingTop: verticalScale(21),
  },
  pt2p2: {
    paddingTop: verticalScale(22),
  },
  pt2p3: {
    paddingTop: verticalScale(23),
  },
  pt2p4: {
    paddingTop: verticalScale(24),
  },
  pt2p8: {
    paddingTop: verticalScale(28),
  },
  pt3: {
    paddingTop: verticalScale(30),
  },
  pt3p2: {
    paddingTop: verticalScale(32),
  },
  pt3p6: {
    paddingTop: verticalScale(36),
  },
  pt4: {
    paddingTop: verticalScale(40),
  },
  pt4p8: {
    paddingTop: verticalScale(48),
  },
  pt5: {
    paddingTop: verticalScale(50),
  },
  pt6: {
    paddingTop: verticalScale(60),
  },
  pt7: {
    paddingTop: verticalScale(70),
  },
  pt8: {
    paddingTop: verticalScale(80),
  },
  pt9: {
    paddingTop: verticalScale(90),
  },
  pt10: {
    paddingTop: verticalScale(100),
  },
  pt140: {
    paddingTop: verticalScale(140),
  },
  pt160: {
    paddingTop: verticalScale(160),
  },
  w0: {
    width: 0,
  },
  w1: {
    width: '10%',
  },
  w1p2: {
    width: '12%',
  },
  w1p3: {
    width: '13%',
  },
  w1p5: {
    width: '15%',
  },
  w2: {
    width: '20%',
  },
  w2p2: {
    width: '22%',
  },
  w2p5: {
    width: '25%',
  },
  w3: {
    width: '30%',
  },
  w3p1: {
    width: '31%',
  },
  w3p2: {
    width: '32%',
  },
  w3p3: {
    width: '33%',
  },
  w4: {
    width: '40%',
  },
  w5: {
    width: '50%',
  },
  w6: {
    width: '60%',
  },
  w7: {
    width: '70%',
  },
  w8: {
    width: '80%',
  },
  w8p2: {
    width: '82%',
  },
  w8p3: {
    width: '83%',
  },
  w8p5: {
    width: '85%',
  },
  w8p6: {
    width: '86%',
  },
  w8p7: {
    width: '87%',
  },
  w8p8: {
    width: '88%',
  },
  w9: {
    width: '90%',
  },
  w10: {
    width: '100%',
  },
  h0: {
    height: 0,
  },
  h1: {
    height: '10%',
  },
  h2: {
    height: '20%',
  },
  h3: {
    height: '30%',
  },
  h4: {
    height: '40%',
  },
  h5: {
    height: '50%',
  },
  h6: {
    height: '60%',
  },
  h7: {
    height: '70%',
  },
  h8: {
    height: '80%',
  },
  h9: {
    height: '90%',
  },
  h10: {
    height: '100%',
  },
  mr0p3: {
    marginRight: scale(3),
  },
  mr0p4: {
    marginRight: scale(4),
  },
  mr0p5: {
    marginRight: moderateScale(5),
  },
  mr0p8: {
    marginRight: moderateScale(8),
  },
  mr1: {
    marginRight: moderateScale(10),
  },
  mr1p6: {
    marginRight: moderateScale(16),
  },
  mr10: {
    marginRight: moderateScale(100),
  },
  mr2: {
    marginRight: moderateScale(20),
  },
  mr2p4: {
    marginRight: moderateScale(24),
  },
  mr3: {
    marginRight: moderateScale(30),
  },
  mr4: {
    marginRight: moderateScale(40),
  },
  mr5: {
    marginRight: moderateScale(50),
  },
  mr6: {
    marginRight: moderateScale(60),
  },
  mr7: {
    marginRight: moderateScale(70),
  },
  mr8: {
    marginRight: moderateScale(80),
  },
  mr9: {
    marginRight: moderateScale(90),
  },
  m0: {
    margin: 0,
  },
  mx0: {
    marginHorizontal: 0,
  },
  mb0: {
    marginBottom: 0,
  },
  mb0p4: {
    marginBottom: scale(4),
  },
  mb0p5: {
    marginBottom: moderateScale(5),
  },
  mb0p8: {
    marginBottom: moderateScale(8),
  },
  mb1: {
    marginBottom: moderateScale(10),
  },
  mb1p2: {
    marginBottom: moderateScale(12),
  },
  mb1p6: {
    marginBottom: moderateScale(16),
  },
  mb2: {
    marginBottom: moderateScale(20),
  },
  mb2p4: {
    marginBottom: moderateScale(24),
  },
  mb3: {
    marginBottom: moderateScale(30),
  },
  mb4: {
    marginBottom: moderateScale(40),
  },
  mb5: {
    marginBottom: moderateScale(50),
  },
  mb6: {
    marginBottom: moderateScale(60),
  },
  mb7: {
    marginBottom: moderateScale(70),
  },
  mb8: {
    marginBottom: moderateScale(80),
  },
  mb9: {
    marginBottom: moderateScale(90),
  },
  mb10: {
    marginBottom: moderateScale(100),
  },

  lineHeight28: {
    lineHeight: scale(28),
  },
  letterSpacing: {
    letterSpacing: scale(0.6),
  },

  fontSatoshiRegular: {
    fontFamily: 'Satoshi-Regular',
  },
  fontSatoshiBlack: {
    fontFamily: 'Satoshi-Black',
  },
  fontSatoshiBold: {
    fontFamily: 'Satoshi-Bold',
  },
  fontSatoshiMedium: {
    fontFamily: 'Satoshi-Medium',
  },
  fontSatoshiLight: {
    fontFamily: 'Satoshi-Light',
  },

  fontInterRegular: {
    fontFamily: 'Inter-Regular',
  },
  fontInterBlack: {
    fontFamily: 'Inter-Black',
  },
  fontInterBold: {
    fontFamily: 'Inter-Bold',
  },
  fontInterExtraBold: {
    fontFamily: 'Inter-ExtraBold',
  },
  fontInterLight: {
    fontFamily: 'Inter-Light',
  },
  fontInterThin: {
    fontFamily: 'Inter-Thin',
  },
  fontInterExtraLight: {
    fontFamily: 'Inter-ExtraLight',
  },
  fontInterMedium: {
    fontFamily: 'Inter-Medium',
  },
  fontInterSemiBold: {
    fontFamily: 'Inter-SemiBold',
  },
  fontRobotoLight: {
    fontFamily: 'Roboto-Light',
  },
  fontRobotoRegular: {
    fontFamily: 'Roboto-Regular',
  },
  fontRobotoMedium: {
    fontFamily: 'Roboto-Medium',
  },
  fontRobotoBold: {
    fontFamily: 'Roboto-Bold',
  },
  fontRobotoBlack: {
    fontFamily: 'Roboto-Black',
  },
  fontWeight300: {
    fontWeight: '300',
  },
  fontWeight400: {
    fontWeight: '400',
  },
  fontWeight500: {
    fontWeight: '500',
  },
  fontWeight600: {
    fontWeight: '600',
  },
  fontWeight700: {
    fontWeight: '700',
  },
  fontWeight800: {
    fontWeight: '800',
  },
  fontWeight900: {
    fontWeight: '900',
  },

  fontSize7: {
    fontSize: scale(7),
  },
  fontSize8: {
    fontSize: scale(8),
  },
  fontSize9: {
    fontSize: scale(9),
  },
  fontSize10: {
    fontSize: scale(10),
  },
  fontSize11: {
    fontSize: scale(11),
  },
  fontSize12: {
    fontSize: scale(12),
  },
  textCapitalise: {
    textTransform: 'capitalize',
  },
  fontSize13: {
    fontSize: scale(13),
  },
  dotSmall: {
    width: scale(3),
    height: scale(3),
  },
  fontSize14: {
    fontSize: scale(14),
  },
  fontSize15: {
    fontSize: scale(15),
  },
  fontSize16: {
    fontSize: scale(16),
  },
  fontSize17: {
    fontSize: scale(17),
  },
  fontSize18: {
    fontSize: scale(18),
  },
  fontSize19: {
    fontSize: scale(19),
  },
  fontSize20: {
    fontSize: scale(20),
  },
  fontSize21: {
    fontSize: scale(21),
  },
  fontSize22: {
    fontSize: scale(22),
  },
  fontSize23: {
    fontSize: scale(23),
  },
  fontSize24: {
    fontSize: scale(24),
    lineHeight: scale(32),
  },
  fontSize28: {
    fontSize: scale(28),
    lineHeight: scale(32),
  },
  fontSize30: {
    fontSize: scale(30),
  },
  fontSize32: {
    fontSize: scale(32),
  },
  fontSize36: {
    fontSize: scale(36),
  },
  fontSize42: {
    fontSize: scale(42),
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },

  textInputHeight: {
    height: scale(46),
  },
  selectHeight: {
    height: scale(46),
  },
  MultiTextInputHeight: {
    height: scale(100),
  },
  minHeightFull: {
    minHeight: rt.screen.height,
  },
  height: {
    height: rt.screen.height,
  },
  modalHeight: {
    height: rt.screen.height * 0.85,
  },
  modalMaxHeight: {
    maxHeight: rt.screen.height * 0.85,
  },
  width: {
    width: rt.screen.width,
  },
  textAlignVertical: {
    textAlignVertical: 'top',
  },
  displayNone: {
    display: 'none',
  },
  noOpacity: {
    opacity: 0,
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  aspectRatio: {
    aspectRatio: 1,
  },
}));
// } as unknown as Record<string, styleType>);

export default globalStyle;
