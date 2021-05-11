import ZoomBridge from 'react-native-zoom-bridge';

import { App } from '@constant';

const ZoomUs = {
  initialize(appKey, appSecret, webDomain) {
    return ZoomBridge.initialize(appKey, appSecret, webDomain);
  },

  startMeeting(
    displayName,
    meetingNo,
    userId, // NOTE: can be 'null', no need for userId when using zakToken
    userType, // for pro user use 2
    zoomAccessToken, // zak token
    zoomToken, // can be 'null', no need for userId when using zakToken
  ) {
    return ZoomBridge.startMeeting(
      displayName,
      meetingNo,
      userId,
      userType,
      zoomAccessToken,
      zoomToken,
    );
  },

  joinMeeting(displayName, meetingNo, meetingPass = App.ZOOM_MEETING_PASSWORD) {
    return ZoomBridge.joinMeetingWithPassword(
      displayName,
      meetingNo,
      meetingPass,
    );
  },
};

export default ZoomUs;
