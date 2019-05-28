const states = {
    CANDIDATING: "CANDIDATING",
    NOT_CANDIDATING: "NOT_CANDIDATING",
    WINNER: "WINNER"
};

$$.asset.describe("Candidate", {
    public: {
        alias: "string",
        uid: "string:alias",
        first_name: "string",
	    last_name: "string",
        votes: "number",
    },
    init: function(uid, first_name, last_name){
        if(!!this.last_name){
            return false;
        }

        this.uid = uid;
        this.alias = uid;
        this.first_name = first_name;
        this.last_name = last_name;
        this.votes = 0;
        this.state = states.CANDIDATING;

        return true;
    },
    receive_vote: function(amount){
        if(this.state !== states.CANDIDATING){
            return false;
        }

        if(amount < 0){
            return false;
        }
        this.votes += amount;
        return true;
    },
    is_candidating: function(){
        return this.state === states.CANDIDATING;
    },
    withdraw: function(){
        if(this.amount > 0){
            return false;
        }

        if(this.state != states.CANDIDATING){
            return false;
        }

        this.state = states.NOT_CANDIDATING;
        return true;
    },
    declare_winner: function() {
        this.state = states.WINNER;
        return true;
    },
    votes: function(){
        return this.votes;
    }
});
