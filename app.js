var ResumeBuilder = /** @class */ (function () {
    function ResumeBuilder() {
        // Input Elements
        this.fullNameInput = document.getElementById('fullName');
        this.emailInput = document.getElementById('email');
        this.phoneInput = document.getElementById('phoneNumber');
        this.profilePicInput = document.getElementById('profilePic');
        // Output Elements
        this.outputName = document.getElementById('outputName');
        this.outputEmail = document.getElementById('outputEmail');
        this.outputPhone = document.getElementById('outputPhone');
        this.outputProfilePic = document.getElementById('outputProfilePic');
        this.outputEducation = document.getElementById('outputEducation');
        this.outputWorkExperience = document.getElementById('outputWorkExperience');
        this.outputSkills = document.getElementById('outputSkills');
        // Action Buttons
        this.generateButton = document.getElementById('generateResume');
        this.editButton = document.getElementById('editResume');
        this.downloadButton = document.getElementById('downloadPDF');
        this.shareButton = document.getElementById('shareLink');
        this.profilePicDataUrl = ''; // Store profile pic data URL
        this.initializeEventListeners();
    }
    ResumeBuilder.prototype.initializeEventListeners = function () {
        var _this = this;
        var _a, _b, _c;
        // Add Entry Buttons
        (_a = document.getElementById('addEducation')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return _this.addEntry('education'); });
        (_b = document.getElementById('addWorkExperience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return _this.addEntry('work'); });
        (_c = document.getElementById('addSkill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return _this.addEntry('skill'); });
        // Action Buttons
        this.generateButton.addEventListener('click', function () { return _this.generateResume(); });
        this.editButton.addEventListener('click', function () { return _this.editResume(); });
        this.downloadButton.addEventListener('click', function () { return _this.downloadResume(); });
        this.shareButton.addEventListener('click', function () { return _this.shareResume(); });
        // Profile Picture Preview
        this.profilePicInput.addEventListener('change', function () { return _this.previewProfilePic(); });
        // Remove Entry Functionality
        this.attachRemoveListeners();
    };
    ResumeBuilder.prototype.addEntry = function (type) {
        var containers = {
            'education': document.getElementById('educationEntries'),
            'work': document.getElementById('workEntries'),
            'skill': document.getElementById('skillEntries')
        };
        var templates = {
            'education': "\n                <div class=\"entry education-entry\">\n                    <input type=\"text\" class=\"degree\" placeholder=\"Degree\">\n                    <input type=\"text\" class=\"institute\" placeholder=\"Institute\">\n                    <input type=\"number\" class=\"year\" placeholder=\"Year\">\n                    <button class=\"remove-btn\">Remove</button>\n                </div>\n            ",
            'work': "\n                <div class=\"entry work-entry\">\n                    <input type=\"text\" class=\"job-title\" placeholder=\"Job Title\">\n                    <input type=\"text\" class=\"company\" placeholder=\"Company\">\n                    <textarea class=\"description\" placeholder=\"Description\"></textarea>\n                    <button class=\"remove-btn\">Remove</button>\n                </div>\n            ",
            'skill': "\n                <div class=\"entry skill-entry\">\n                    <input type=\"text\" class=\"skill-name\" placeholder=\"Skill Name\">\n                    <select class=\"skill-level\">\n                        <option>Beginner</option>\n                        <option>Intermediate</option>\n                        <option>Advanced</option>\n                    </select>\n                    <button class=\"remove-btn\">Remove</button>\n                </div>\n            "
        };
        var container = containers[type];
        if (container) {
            var newEntry = document.createElement('div');
            newEntry.innerHTML = templates[type];
            container.appendChild(newEntry);
            this.attachRemoveListeners();
        }
    };
    ResumeBuilder.prototype.attachRemoveListeners = function () {
        var removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                var entry = event.target.closest('.entry');
                entry === null || entry === void 0 ? void 0 : entry.remove();
            });
        });
    };
    ResumeBuilder.prototype.previewProfilePic = function () {
        var _this = this;
        var _a;
        var file = (_a = this.profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var dataUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                _this.outputProfilePic.src = dataUrl;
                _this.profilePicDataUrl = dataUrl; // Store for PDF
            };
            reader.readAsDataURL(file);
        }
    };
    ResumeBuilder.prototype.generateResume = function () {
        var _this = this;
        // Personal Info
        this.outputName.textContent = this.fullNameInput.value;
        this.outputEmail.innerHTML = "<strong>Email:</strong> ".concat(this.emailInput.value);
        this.outputPhone.innerHTML = "<strong>Phone:</strong> ".concat(this.phoneInput.value);
        // Education
        this.outputEducation.innerHTML = '';
        var educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach(function (entry) {
            var degree = entry.querySelector('.degree').value;
            var institute = entry.querySelector('.institute').value;
            var year = entry.querySelector('.year').value;
            if (degree || institute) {
                var li = document.createElement('li');
                li.innerHTML = "<strong>".concat(degree, "</strong> - ").concat(institute, " (").concat(year, ")");
                _this.outputEducation.appendChild(li);
            }
        });
        // Work Experience
        this.outputWorkExperience.innerHTML = '';
        var workEntries = document.querySelectorAll('.work-entry');
        workEntries.forEach(function (entry) {
            var jobTitle = entry.querySelector('.job-title').value;
            var company = entry.querySelector('.company').value;
            var description = entry.querySelector('.description').value;
            if (jobTitle || company) {
                var li = document.createElement('li');
                li.innerHTML = "<strong>".concat(jobTitle, "</strong> - ").concat(company, "<br>").concat(description);
                _this.outputWorkExperience.appendChild(li);
            }
        });
        // Skills
        this.outputSkills.innerHTML = '';
        var skillEntries = document.querySelectorAll('.skill-entry');
        skillEntries.forEach(function (entry) {
            var skillName = entry.querySelector('.skill-name').value;
            var skillLevel = entry.querySelector('.skill-level').value;
            if (skillName) {
                var li = document.createElement('li');
                li.innerHTML = "<strong>".concat(skillName, "</strong> (").concat(skillLevel, ")");
                _this.outputSkills.appendChild(li);
            }
        });
    };
    ResumeBuilder.prototype.editResume = function () {
        var _a;
        (_a = document.querySelector('.input-section')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    ResumeBuilder.prototype.downloadResume = function () {
        var printWindow = window.open('', '', 'width=800,height=900');
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write("\n                <html>\n                    <head>\n                        <title>Resume</title>\n                        <style>\n                            body { \n                                font-family: 'Times New Roman', Times, serif;\n                                max-width: 600px; \n                                margin: 0 auto; \n                                padding: 20px;\n                                line-height: 1.6;\n                            }\n                            .resume-header {\n                                display: flex;\n                                align-items: center;\n                                margin-bottom: 20px;\n                                border-bottom: 2px solid #333;\n                                padding-bottom: 10px;\n                            }\n                            .profile-pic {\n                                width: 150px;\n                                height: 150px;\n                                border-radius: 50%;\n                                object-fit: cover;\n                                margin-right: 20px;\n                            }\n                            .header-info {\n                                flex-grow: 1;\n                            }\n                            h1 { margin: 0; color: #333; }\n                            h2 { color: #444; border-bottom: 1px solid #ccc; padding-bottom: 5px; }\n                            ul { padding-left: 20px; }\n                            li { margin-bottom: 10px; }\n                        </style>\n                    </head>\n                    <body>\n                        <div class=\"resume-header\">\n                            ".concat(this.profilePicDataUrl ?
                "<img src=\"".concat(this.profilePicDataUrl, "\" alt=\"Profile Picture\" class=\"profile-pic\">") :
                '', "\n                            <div class=\"header-info\">\n                                <h1>").concat(this.outputName.textContent || '', "</h1>\n                                <p>").concat(this.outputEmail.textContent || '', "</p>\n                                <p>").concat(this.outputPhone.textContent || '', "</p>\n                            </div>\n                        </div>\n                        \n                        <h2>Education</h2>\n                        <ul>").concat(this.outputEducation.innerHTML, "</ul>\n                        \n                        <h2>Work Experience</h2>\n                        <ul>").concat(this.outputWorkExperience.innerHTML, "</ul>\n                        \n                        <h2>Skills</h2>\n                        <ul>").concat(this.outputSkills.innerHTML, "</ul>\n                    </body>\n                </html>\n            "));
            printWindow.document.close();
            printWindow.print();
        }
    };
    ResumeBuilder.prototype.shareResume = function () {
        // Generate a shareable link to the output resume section
        var resumeSection = document.getElementById('output-section');
        if (resumeSection) {
            var shareLink = window.location.href.split('#')[0] + '#output-section';
            try {
                navigator.clipboard.writeText(shareLink);
                alert('Link to output resume copied to clipboard!');
            }
            catch (error) {
                console.error('Failed to copy link', error);
                alert('Could not copy link. Please try again.');
            }
        }
    };
    // Initialize the application
    ResumeBuilder.start = function () {
        new ResumeBuilder();
    };
    return ResumeBuilder;
}());
// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', ResumeBuilder.start);
