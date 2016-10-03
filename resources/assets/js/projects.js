var Projects = {
    projects: [],

    init: function() {
        this.load('feedstamp-web');
        this.load('feedstamp-mobile');
        this.load('feedstamp-device');
        this.load('brandbassador-web');
        this.load('brandbassador-mobile');
        this.load('piecekeeper-web');
        this.load('piecekeeper-mobile');
        this.load('secondcup-ui');
        this.load('online-tennis');
    },

    get: function(project) {
        if (project in this.projects) {
            return this.projects[project];
        }
    },

    loaded: function(project) {
        return (project in this.projects);
    },

    load: function(project) {
        if (!(project in this.projects)) {
            $.ajax({
                type: "GET",
                url: "./api/project?project=" + project,
                dataType: "json",
                success: function(response) {
                    Projects.projects[project] = [{
                        html: response.project
                    }];
                }
            });
        }
    }
};

Projects.init();