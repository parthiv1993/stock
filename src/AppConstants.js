/*
  FILE TO KEEP CONSTANTS THAT ARE USED IN APP .

  */

export default {
    // SINCE NOT USING LESS OR SASS, FOR SMALL CSS CONSTANTS ARE USED
    COLOUR_SCHEMA : {
        GREEN : '#85e085',
        RED : '#e08585',
        WHITE : '#ffffff'
    },

    // THESE ARE RELATED TO API CALLS AND OTHER THINGS,
    serverConfig: {
        url : 'localhost:3003',
        startCommand : 'join',
        updateListener : 'stock',
        endCommand : 'leave'
    },
    // serverConfig: {
    //     url : 'ws://stocks.mnet.website',
    //     startCommand : 'join',
    //     updateListener : 'message',
    //     endCommand : 'leave'
    // },
}