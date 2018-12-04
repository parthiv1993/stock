const MILLISECONDS = {
    MINUTE : 60000,
    HOUR : 60000 * 60,
    DAY : 60000 * 60 * 24
}

/* Function takes in time at which a sript was last updated and then shows the last updated field 
    in more readable format like 
    0-60 seconds => few seconds ago
    1-60 min => 5 mins ago
    1-24 hours => 5 hours ago
    show the full date and time
*/
export function getTextForLastUpdatedTime(timeUpdated) {
    const currentTime = new Date();
    const updatedAgo = currentTime - timeUpdated;
    if(updatedAgo< MILLISECONDS.MINUTE) {
        return 'Few Seconds Ago'
    } else if (updatedAgo < MILLISECONDS.HOUR) {
        const numberOfMinutes = Math.floor(updatedAgo/MILLISECONDS.MINUTE)
        return numberOfMinutes + ' Minute(s) ago'
    } else if (updatedAgo < MILLISECONDS.DAY) {
        const numberOfHour = Math.floor(updatedAgo/MILLISECONDS.HOUR)
        return numberOfHour + ' Hour(s) ago'
    }else {
        return 'updated at '+timeUpdated.toLocaleString()
    }
}