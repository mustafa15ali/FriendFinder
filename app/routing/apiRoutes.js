var friends = require("../data/friends.js");

// ROUTING

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var bestFriend = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        // Taking the user"s survey POST and parse it.
        var userData = req.body;
        var userScores = userData.scores;

        var totalDifference;

        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);

            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                //Calculate the difference between the scores and add them into the totalDifference
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDifference <= bestFriend.friendDifference) {

                // Reset the bestFriend to be the new bestfriend.

                bestFriend.name = currentFriend.name;
                bestFriend.photo = currentFriend.photo;
                bestFriend.friendDifference = totalDifference;
            }
        }

        // Save the user's data to the database
        friends.push(userData);

        res.json(bestFriend);
    });
};