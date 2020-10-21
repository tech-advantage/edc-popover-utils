/**
 * Animation types while opening the popover
 */
export enum AnimationType {
    PERSPECTIVE = 'perspective',
    PERSPECTIVE_SUBTLE = 'perspective-subtle',
    PERSPECTIVE_EXTREME = 'perspective-extreme',
    SCALE = 'scale',
    SCALE_SUBTLE = 'scale-subtle',
    SCALE_EXTREME = 'scale-extreme',
    SHIFT_AWAY = 'shift-away',
    SHIFT_AWAY_SUBTLE = 'shift-away-subtle',
    SHIFT_AWAY_EXTREME = 'shift-away-extreme',
    SHIFT_TOWARD = 'shift-toward',
    SHIFT_TOWARD_SUBTLE = 'shift-toward-subtle',
    SHIFT_TOWARD_EXTREME = 'shift-toward-extreme',
}

export type Animation =
    AnimationType.PERSPECTIVE |
    AnimationType.PERSPECTIVE_SUBTLE |
    AnimationType.PERSPECTIVE_EXTREME |
    AnimationType.SCALE |
    AnimationType.SCALE_SUBTLE |
    AnimationType.SCALE_EXTREME |
    AnimationType.SHIFT_AWAY |
    AnimationType.SHIFT_AWAY_SUBTLE |
    AnimationType.SHIFT_AWAY_EXTREME |
    AnimationType.SHIFT_TOWARD |
    AnimationType.SHIFT_TOWARD_SUBTLE |
    AnimationType.SHIFT_TOWARD_EXTREME;

export const Animations: Animation[] = Object.values(AnimationType);
