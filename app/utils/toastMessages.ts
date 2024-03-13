export const toastMessages = {
    startedTrackingLocation: {
        type: 'success',
        text1: 'Location Tracking Enabled',
        text2: 'We have stated tracking your locaiton!',
    },
    addedLocation: {
        type: 'success',
        text1: 'Location Tracked',
        text2: 'Tracked your current locaiton!',
    },
    removedLocation: {
        type: 'info',
        text1: 'Location Removed',
        text2: 'Removed location from history!',
    },
    removedAllLocation: {
        type: 'info',
        text1: 'Location History Cleared',
        text2: 'Removed all tracked locaiton from history!',
    },
    stoppedTrackingLocation: {
        type: 'info',
        text1: 'Location Traking Disabled : limit reached',
        text2: 'Disabled tracking location due to limit reached!',
    },
    turnedOffLocation: {
        type: 'error',
        text1: 'Location Tracking Unavailable: Enable Location Services',
        text2: 'Location tracking is currently unavailable because your device\'s location services have been disabled! Please enable location services to resume tracking.',
    },

}