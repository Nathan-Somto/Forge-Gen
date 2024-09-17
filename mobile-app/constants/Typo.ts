export enum Fonts {
    Regular = 'Poppins-Regular',
    Semibold= 'Poppins-SemiBold',
    Medium = 'Poppins-Medium',
}
export default {
    semibold: Fonts.Semibold,
    regular: Fonts.Regular,
    medium: Fonts.Medium,
    sizes: {
        h1: {
            fontSize: 30,
            fontFamily: Fonts.Semibold,
            lineHeight: 36,
        },
        h2: {
            fontSize: 24,
            fontFamily: Fonts.Semibold,
            lineHeight: 28,
        },
        h3: {
            fontSize: 20,
            fontFamily: Fonts.Medium,
            lineHeight: 24,
        },
        p: {
            fontSize: 18,
            fontFamily: Fonts.Regular,
            lineHeight: 24,
        },
        sm: {
            fontSize: 16,
            fontFamily: Fonts.Regular,
            lineHeight: 20,
        }
        
    }
}