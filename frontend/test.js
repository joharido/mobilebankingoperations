function key(){
Notiflix.Confirm.Init({
    className: 'notiflix-confirm',
    width: '300px',
    zindex: 4003,
    position: 'center', // 'center' - 'center-top' -  'right-top' - 'right-bottom' - 'left-top' - 'left-bottom'
    distance: '10px',
    backgroundColor: '#f8f8f8',
    borderRadius: '25px',
    backOverlay: true,
    backOverlayColor: 'rgba(0,0,0,0.5)',
    rtl: false,
    useGoogleFont: false, // v2.2.0 and the next versions => has been changed as "false"
    fontFamily: 'Quicksand',
    cssAnimation: true,
    cssAnimationStyle: 'fade', // 'zoom' - 'fade'
    cssAnimationDuration: 300,
    plainText: true,
    titleColor: '#32c682',
    titleFontSize: '16px',
    titleMaxLength: 34,
    messageColor: '#1e1e1e',
    messageFontSize: '14px',
    messageMaxLength: 110,
    buttonsFontSize: '15px',
    buttonsMaxLength: 34,
    okButtonColor: '#f8f8f8',
    okButtonBackground: '#32c682',
    cancelButtonColor: '#f8f8f8',
    cancelButtonBackground: '#a9a9a9',
  });
  
  // or
  Notiflix.Confirm.Show('Confirm Title','Confirm Message','Ok Button Text');
  
  // with callbacks
  Notiflix.Confirm.Show(
    'Confirm Title',
    'Confirm Message',
    'Ok Button Text',
    'Cancel Button Text',
    function(){
    // yes callback
    },
    function(){
    // no
    }
  );
}