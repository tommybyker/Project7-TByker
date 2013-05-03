/**************************************
TITLE: app-tjb.js (For Project 7)
 AUTHOR: Thomas J. Byker (TJB)
 CREATE DATE: 04.29.2013
 PURPOSE: JavaScript code for Project 7. The Final Project.  
 LAST MODIFIED ON: 05.02.2013
 LAST MODIFIED BY: Thomas J. Byker (TJB)
 MODIFICATION HISTORY: GITHub Initial Push to Server 05.02.2013

***************************************/

var app, jQT;

//var JQT Instantiation function
(function (e, t) {
    e(function () {
        jQT = new e.jQTouch({
            statusBar: "black-translucent",
            preloadImages: []
        })
    });
    t.location = "#";
    var n = {
        Base: FlipClock.Base.extend()
    };
    n.Factory = n.Base.extend({
        classes: {
            cancelTimecardForm: "todo-app-timecard-form-cancel",
            deleteProjectForm: "todo-app-delete-project-form",
            editProject: "todo-app-edit-project",
            projects: "todo-app-projects",
            startStopButton: "todo-start-stop",
            projectForm: "todo-app-project-form",
            editProjectForm: "todo-app-edit-project-form",
            newProjectButton: "todo-app-new-project",
            editProjectButton: "todo-app-edit-project",
            deleteTimecard: "todo-app-delete-timecard",
            timecardForm: "todo-app-timecard-form",
            timecardEditForm: "todo-app-edit-timecard-form",
            timecards: "todo-app-timecards",
            stats: "todo-app-project-stats"
        },
        clock: !1,
        edit: !1,
        editTimecard: !1,
        icons: {
            warning: "icon-warning-sign"
        },
        model: !1,
        newProject: !1,
        projects: [],
        ui: {},
        
        //constructor function
        constructor: function (t, r) {
            this.base(r);
            this.ui.wrapper = t;
            this.model = new n.Model;
            this.clock = e("#clock").FlipClock({
                clockFace: "HourlyCounter",
                autoStart: !1
            });
            this.ui.projects = this.ui.wrapper.find("." + this.classes.projects);
            this.model.getProjects().length === 0 ? this.ui.projects.append('<li><div class="empty"><i class="' + this.icons.warning + '"></i> There are no projects at this time. <a href="#project-form" class="slideup block button todo-app-new-project">New Project</a></div></li>') : this._loadProjects();
            this.ui.projects = this.ui.wrapper.find("." + this.classes.projects);
            this.ui.timecards = this.ui.wrapper.find("." + this.classes.timecards);
            this.ui.projectForm = this.ui.wrapper.find("." + this.classes.projectForm);
            this.ui.editProjectForm = this.ui.wrapper.find("." + this.classes.editProjectForm);
            this.ui.deleteProjectForm = this.ui.wrapper.find("." + this.classes.deleteProjectForm);
            this.ui.editProject = this.ui.wrapper.find("." + this.classes.editProject);
            this.ui.timecardForm = this.ui.wrapper.find("." + this.classes.timecardForm);
            this.ui.timecardEditForm = this.ui.wrapper.find("." + this.classes.timecardEditForm);
            this.ui.deleteTimecard = this.ui.wrapper.find("." + this.classes.deleteTimecard);
            this.ui.newProjectButton = this.ui.wrapper.find("." + this.classes.newProjectButton);
            this.ui.editProjectButton = this.ui.wrapper.find("." + this.classes.editProjectButton);
            this.ui.startStopButton = this.ui.wrapper.find("." + this.classes.startStopButton);
            this.ui.cancelTimecardForm = this.ui.wrapper.find("." + this.classes.cancelTimecardForm);
            this.ui.stats = this.ui.wrapper.find("." + this.classes.stats);
            this._bindEventHandlers()
        },
        
        //_loadProjects function
        _loadProjects: function () {
            var t = this,
                r = this.model.getProjects(),
                i = [];
            e.each(r, function (e, r) {
                i.push(new n.Project(t, r))
            });
            this.projects = i
        },
        
        //_bindEventHandlers function
        _bindEventHandlers: function () {
            var n = this;
            this.ui.newProjectButton.unbind("click").click(function (e) {
                n.newProject = !0;
                n.ui.projectForm.prev("header").find("h1").html("New Project");
                n.ui.projectForm.find("button").text("Create Project")
            });
            this.ui.editProjectForm.unbind("submit").submit(function (e) {
                n._editProject()
            });
            this.ui.editProject.unbind("click").click(function (e) {
                n._populateEditProjectForm(n.edit)
            });
            this.ui.projectForm.unbind("submit").submit(function (e) {
                var r = n._getProjectFormData();
                n.newProject ? n.model.createProject(r) : console.log("edit project");
                n.newProject = !1;
                t.location = "./";
                return !1
            });
            this.ui.timecardEditForm.unbind("submit").submit(function () {
                n._editTimecard();
                return !1
            });
            this.ui.startStopButton.unbind("click").click(function (t) {
                var r = e(this),
                    i = r.html();
                i == "Start" && n._startClock();
                i == "Stop" && n._stopClock();
                i == "Save" && n._saveTimecard();
                r.removeClass("active");
                return !1
            });
            this.ui.cancelTimecardForm.unbind("click").click(function (e) {
                n._cancelTimecardForm();
                return !1
            });
            this.ui.deleteTimecard.unbind("submit").submit(function (e) {
                n._deleteTimecard();
                return !1
            });
            this.ui.deleteProjectForm.unbind("submit").submit(function (e) {
                n._deleteProject();
                return
            })
        },
        
        //_deleteProject function
        _deleteProject: function () {
            this.model.deleteProject(this.edit.id);
            t.location = "./"
        },
        
        //_deleteTimecard function
        _deleteTimecard: function () {
            this.model.deleteTimecard(this.editTimecard.ID);
            this.edit._displayTimecards();
            jQT.goTo("#project", "slidedown")
        },
        
        //_editProject function
        _editProject: function () {
            var e = {
                title: this.ui.editProjectForm.find("#name").val(),
                rate: this.ui.editProjectForm.find("#rate").val(),
                description: this.ui.editProjectForm.find("#description").val()
            };
            this.model.updateProject(this.edit.id, e);
            t.location = "./"
        },
        
        //_editTimecard function
        _editTimecard: function () {
            var e = {
                time: this.ui.timecardEditForm.find("#time").val(),
                details: this.ui.timecardEditForm.find("#details").val()
            };
            this.model.updateTimecard(this.editTimecard.ID, e);
            this.edit._displayTimecards();
            jQT.goTo("#project", "slidedown")
        },
        
        //_stopClock function
        _stopClock: function (e) {
            var t = this;
            this.model.saveClockTime(t.edit.id, !1);
            this.ui.timecardForm.slideToggle();
            this.clock.stop();
            this.ui.startStopButton.html("Save")
        },
        
        //_startClock function
        _startClock: function (e) {
            var t = this;
            e !== !1 && t.model.saveClockTime(t.edit.id, new Date);
            this.ui.startStopButton.html("Stop");
            this.clock.start()
        },
        
        //_saveTimecard function
        _saveTimecard: function () {
            var e = {
                time: this.clock.getTime().time,
                details: this.ui.timecardForm.find("textarea").val(),
                date: new Date
            };
            this.model.createTimecard(this.edit.id, e);
            this._cancelTimecardForm();
            this.edit._displayTimecards()
        },
        
        //_cancelTimecardForm function
        _cancelTimecardForm: function (e) {
            this.ui.timecardForm.css("display") != "none" && this.ui.timecardForm.slideToggle();
            this.ui.timecardForm.find("textarea").val("");
            this.ui.startStopButton.html("Start");
            this.clock.setTime(0)
        },
        
        //_getProjectFormData function
        _getProjectFormData: function () {
            return {
                title: this.ui.projectForm.find("#name").val(),
                rate: this.ui.projectForm.find("#rate").val(),
                description: this.ui.projectForm.find("#description").val()
            }
        },
        
        //_populate ProjectForm function
        _populateProjectForm: function (e) {
            this.ui.projectForm.find("#name").val(e.title || "");
            this.ui.projectForm.find("#rate").val(e.rate || "");
            this.ui.projectForm.find("#description").val(e.description || "")
        },
        
        //_populateEditProjectForm function
        _populateEditProjectForm: function (e) {
            this.ui.editProjectForm.find("#name").val(e.title || "");
            this.ui.editProjectForm.find("#rate").val(e.rate || "");
            this.ui.editProjectForm.find("#description").val(e.description || "")
        },
        
        //_resetProjectForm function
        _resetProjectForm: function () {
            this.ui.projectForm.find("#name").val("");
            this.ui.projectForm.find("#rate").val("");
            this.ui.projectForm.find("#description").val("")
        }
    });
    n.Project = n.Base.extend({
        id: !1,
        classes: {
            actions: "timecard-actions",
            edit: "timecard-edit",
            trash: "timecard-trash",
            timecard: "timecard",
            time: "timecard-time",
            details: "timecard-details",
            chevron: "icon-chevron-right",
            header: "timecard-header"
        },
        icons: {
            edit: "icon-edit",
            trash: "icon-trash"
        },
        date: !1,
        description: !1,
        factory: !1,
        lastStartTime: 0,
        rate: 0,
        title: !1,
        timecards: [],
        ui: {
            li: !1
        },
        
        //_constructor function
        constructor: function (e, t) {
            this.base(t);
            this.id = t.ID;
            this.factory = e;
            this._render()
        },
        
        //_displayTimecards function
        _displayTimecards: function () {
            var t = this.factory.model.getTimecards(this.id),
                n = this,
                r = 0,
                i = 0;
            n.factory.ui.timecards.html("");
            n.factory.ui.wrapper.find("#project .toolbar h1").html(this.title);
            if (t.length > 0) {
                e.each(t, function (t, s) {
                    var o = new FlipClock.Time(n.factory.clock, s.time),
                        u = o.getHours(!0),
                        a = o.getMinutes(!0),
                        f = new Date(s.date);
                    r += u;
                    i += a;
                    var l = e(['<div class="' + n.classes.timecard + '">', '<div class="' + n.classes.actions + '">', '<a href="#timecard-form" class="' + n.classes.edit + ' slideup"><i class="' + n.icons.edit + '"></i></a>', '<a href="#timecard-trash" class="' + n.classes.trash + ' slideup"><i class="' + n.icons.trash + '"></i></a>', "</div>", '<h3 class="' + n.classes.header + '">' + (f.getMonth() + 1) + "/" + f.getDate() + "/" + f.getFullYear() + " " + (f.getHours() > 12 ? f.getHours() - 12 : f.getHours()) + ":" + (f.getMinutes() < 10 ? "0" : "") + f.getMinutes() + " " + (f.getHours() > 11 ? "PM" : "AM") + ' <span class="' + n.classes.time + '">(' + u + "hr" + (u != 1 ? "s" : "") + ":" + a + "min)</span></h3>", '<div class"' + n.classes.details + '"><p>' + (s.details ? s.details : "") + "</p></div>", "</div>"].join(""));
                    l.find("." + n.classes.edit).click(function () {
                        n.factory.editTimecard = s;
                        n.factory.ui.timecardEditForm.find("#time").val(s.time);
                        n.factory.ui.timecardEditForm.find("#details").val(s.details)
                    });
                    l.find("." + n.classes.trash).click(function () {
                        n.factory.editTimecard = s
                    });
                    n.factory.ui.timecards.append(l)
                });
                if (i > 60) {
                    r += Math.floor(i / 60);
                    i %= 60
                }
                var s = (parseFloat(n.factory.edit.rate) * (r + i / 60)).formatMoney("2", ".", ",");
                n.factory.ui.stats.html("You have worked a total of " + (r > 0 ? r + " hour" + (r != 1 ? "s" : "") + " and " : "") + i + " minute" + (i != 1 ? "s" : "") + " on this project for $" + s + "")
            } else {
                n.factory.ui.stats.html("");
                n.factory.ui.timecards.append('<div class="empty"><p><i class="' + n.factory.icons.warning + '"></i> There are no timecards for this project.</p></div>')
            }
        },
        
        //_render function
        _render: function () {
            var t = this;
            this.ui.li = e('<li data-id="' + this.id + '"><a href="#project"><span>' + this.title + '</span> <i class="' + this.classes.chevron + '"></i></a></li>');
            this.ui.li.unbind("click").click(function () {
                t.factory.edit = t;
                t._displayTimecards();
                if (t.lastStartTime) {
                    var e = (new Date(t.lastStartTime)).getTime(),
                        n = (new Date).getTime();
                    t.factory.clock.setTime((n - e) / 1e3);
                    t.factory._startClock(!1)
                }
            });
            this.factory.ui.projects.append(this.ui.li)
        }
    });
    n.Model = n.Base.extend({
        databaseName: "TodoApp",
        db: !1,
        constructor: function (e) {
            this.base(e);
            this.db = new localStorageDB(this.databaseName, localStorage);
            this._firstRun()
        },
        
        //_firstrun function
        _firstRun: function () {
            this.db.tableExists("projects") || this.db.createTable("projects", ["title", "rate", "description", "date", "lastStartTime"]);
            this.db.tableExists("timecards") || this.db.createTable("timecards", ["projectId", "details", "time", "date"]);
            this.db.commit()
        },
        
        //getProjects function
        getProjects: function (e) {
            return this.db.query("projects", e)
        },
        
        //getProject function
        getProject: function (e) {
            return this.getProjects({
                id: e
            })
        },
        
        //create Project function
        createProject: function (e) {
            e.date || (e.date = new Date);
            this.db.insert("projects", e);
            this.db.commit()
        },
        
        //updateProject function
        updateProject: function (t, n) {
            this.db.update("projects", {
                ID: t
            }, function (t) {
                return e.extend(!0, {}, t, n)
            });
            this.db.commit()
        },
        
        //deleteProject function
        deleteProject: function (e) {
            this.db.deleteRows("projects", {
                ID: e
            });
            this.deleteTimecards(e);
            this.db.commit()
        },
        
        //SaveClockTime function
        saveClockTime: function (e, t) {
            this.updateProject(e, {
                lastStartTime: t
            })
        },
        
        //getTimecards function
        getTimecards: function (t, n) {
            typeof n != "object" && (n = {});
            n = e.extend(!0, {}, n, {
                projectId: t
            });
            return this.db.query("timecards", n)
        },
        
        //getTimecard function
        getTimecard: function (e) {
            return this.db.query("timecards", {
                ID: e
            })
        },
        
        //createTimecard function
        createTimecard: function (t, n) {
            n = e.extend(!0, {}, n, {
                projectId: t
            });
            this.db.insert("timecards", n);
            this.db.commit()
        },
        
        //updateTimecard function
        updateTimecard: function (e, t) {
            this.db.update("timecards", {
                ID: e
            }, function (e) {
                e.time = t.time;
                e.details = t.details;
                return e
            });
            this.db.commit()
        },
        
        //deleteTimecard function
        deleteTimecard: function (e) {
            this.db.deleteRows("timecards", {
                ID: e
            });
            this.db.commit()
        },
        
        //deleteTimecards function
        deleteTimecards: function (e) {
            this.db.deleteRows("timecards", {
                projectId: e
            });
            this.db.commit()
        }
    });
    n.Timecard = n.Base.extend({
        classes: {
            wrapper: "timecard",
            actions: "timecard-actions",
            header: "timecard-header",
            details: "timecard-details",
            edit: "timecard-edit",
            remove: "timecard-delete"
        },
        icons: {
            edit: "icon-edit"
        },
        ui: {
            details: !1,
            edit: !1,
            remove: !1,
            wrapper: !1
        },
        date: new Date,
        time: !1,
        details: "",
        factory: !1,
        
        //constructor function
        constructor: function (e, t) {
            this.base(t);
            this.factory = e;
            this._render()
        },
        
        //_render function
        _render: function () {
            this.ui.wrapper = e(['<div class="' + this.classes.wrapper + '">', '<div class="' + this.classes.actions + '"></div>', '<div class="' + this.classes.details + '">', this.details, "</div>", "</div>"].join(""));
            this.ui.edit = e('<a href="#" class="' + this.classes.edit + '"><i class="' + this.icons.edit + '"></i></a>');
            this.ui.remove = e('<a href="#" class="' + this.classes.remove + '"><i class="' + this.icons.edit + '"></i></a>');
            this.ui.details = this.ui.wrapper.find("." + this.classes.details);
            this.ui.wrapper.append(this.ui.edit).append(this.ui.remove);
            this.factory.ui.timecards.append(this.ui.wrapper)
        }
    });
    n.Log = n.Base.extend({});
    app = new n.Factory(e("#jqt"));
    e('a[href="#home"]').click(function () {
        app.clock.stop();
        app._cancelTimecardForm()
    });
    Number.prototype.formatMoney = function (e, t, n) {
        var r = this;
        e = isNaN(e = Math.abs(e)) ? 2 : e;
        t = t === undefined ? "." : t;
        n = n === undefined ? "," : n;
        var i = r < 0 ? "-" : "",
            s = parseInt(r = Math.abs(+r || 0).toFixed(e), 10) + "",
            o = (o = s.length) > 3 ? o % 3 : 0;
        return i + (o ? s.substr(0, o) + n : "") + s.substr(o).replace(/(\d{3})(?=\d)/g, "$1" + n) + (e ? t + Math.abs(r - s).toFixed(e).slice(2) : "")
    }
})(jQuery, this);