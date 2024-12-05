class ResumeBuilder {
    // Input Elements
    private fullNameInput = document.getElementById('fullName') as HTMLInputElement;
    private emailInput = document.getElementById('email') as HTMLInputElement;
    private phoneInput = document.getElementById('phoneNumber') as HTMLInputElement;
    private profilePicInput = document.getElementById('profilePic') as HTMLInputElement;

    // Output Elements
    private outputName = document.getElementById('outputName') as HTMLHeadingElement;
    private outputEmail = document.getElementById('outputEmail') as HTMLDivElement;
    private outputPhone = document.getElementById('outputPhone') as HTMLDivElement;
    private outputProfilePic = document.getElementById('outputProfilePic') as HTMLImageElement;
    private outputEducation = document.getElementById('outputEducation') as HTMLUListElement;
    private outputWorkExperience = document.getElementById('outputWorkExperience') as HTMLUListElement;
    private outputSkills = document.getElementById('outputSkills') as HTMLUListElement;

    // Action Buttons
    private generateButton = document.getElementById('generateResume') as HTMLButtonElement;
    private editButton = document.getElementById('editResume') as HTMLButtonElement;
    private downloadButton = document.getElementById('downloadPDF') as HTMLButtonElement;
    private shareButton = document.getElementById('shareLink') as HTMLButtonElement;

    private profilePicDataUrl: string = ''; // Store profile pic data URL

    constructor() {
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        // Add Entry Buttons
        document.getElementById('addEducation')?.addEventListener('click', () => this.addEntry('education'));
        document.getElementById('addWorkExperience')?.addEventListener('click', () => this.addEntry('work'));
        document.getElementById('addSkill')?.addEventListener('click', () => this.addEntry('skill'));

        // Action Buttons
        this.generateButton.addEventListener('click', () => this.generateResume());
        this.editButton.addEventListener('click', () => this.editResume());
        this.downloadButton.addEventListener('click', () => this.downloadResume());
        this.shareButton.addEventListener('click', () => this.shareResume());

        // Profile Picture Preview
        this.profilePicInput.addEventListener('change', () => this.previewProfilePic());

        // Remove Entry Functionality
        this.attachRemoveListeners();
    }

    private addEntry(type: 'education' | 'work' | 'skill'): void {
        const containers = {
            'education': document.getElementById('educationEntries'),
            'work': document.getElementById('workEntries'),
            'skill': document.getElementById('skillEntries')
        };

        const templates = {
            'education': `
                <div class="entry education-entry">
                    <input type="text" class="degree" placeholder="Degree">
                    <input type="text" class="institute" placeholder="Institute">
                    <input type="number" class="year" placeholder="Year">
                    <button class="remove-btn">Remove</button>
                </div>
            `,
            'work': `
                <div class="entry work-entry">
                    <input type="text" class="job-title" placeholder="Job Title">
                    <input type="text" class="company" placeholder="Company">
                    <textarea class="description" placeholder="Description"></textarea>
                    <button class="remove-btn">Remove</button>
                </div>
            `,
            'skill': `
                <div class="entry skill-entry">
                    <input type="text" class="skill-name" placeholder="Skill Name">
                    <select class="skill-level">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                    <button class="remove-btn">Remove</button>
                </div>
            `
        };

        const container = containers[type];
        if (container) {
            const newEntry = document.createElement('div');
            newEntry.innerHTML = templates[type];
            container.appendChild(newEntry);
            this.attachRemoveListeners();
        }
    }

    private attachRemoveListeners(): void {
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const entry = (event.target as HTMLButtonElement).closest('.entry');
                entry?.remove();
            });
        });
    }

    private previewProfilePic(): void {
        const file = this.profilePicInput.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target?.result as string;
                this.outputProfilePic.src = dataUrl;
                this.profilePicDataUrl = dataUrl; // Store for PDF
            };
            reader.readAsDataURL(file);
        }
    }

    private generateResume(): void {
        // Personal Info
        this.outputName.textContent = this.fullNameInput.value;
        this.outputEmail.innerHTML = `<strong>Email:</strong> ${this.emailInput.value}`;
        this.outputPhone.innerHTML = `<strong>Phone:</strong> ${this.phoneInput.value}`;

        // Education
        this.outputEducation.innerHTML = '';
        const educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach(entry => {
            const degree = (entry.querySelector('.degree') as HTMLInputElement).value;
            const institute = (entry.querySelector('.institute') as HTMLInputElement).value;
            const year = (entry.querySelector('.year') as HTMLInputElement).value;

            if (degree || institute) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${degree}</strong> - ${institute} (${year})`;
                this.outputEducation.appendChild(li);
            }
        });

        // Work Experience
        this.outputWorkExperience.innerHTML = '';
        const workEntries = document.querySelectorAll('.work-entry');
        workEntries.forEach(entry => {
            const jobTitle = (entry.querySelector('.job-title') as HTMLInputElement).value;
            const company = (entry.querySelector('.company') as HTMLInputElement).value;
            const description = (entry.querySelector('.description') as HTMLTextAreaElement).value;

            if (jobTitle || company) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${jobTitle}</strong> - ${company}<br>${description}`;
                this.outputWorkExperience.appendChild(li);
            }
        });

        // Skills
        this.outputSkills.innerHTML = '';
        const skillEntries = document.querySelectorAll('.skill-entry');
        skillEntries.forEach(entry => {
            const skillName = (entry.querySelector('.skill-name') as HTMLInputElement).value;
            const skillLevel = (entry.querySelector('.skill-level') as HTMLSelectElement).value;

            if (skillName) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${skillName}</strong> (${skillLevel})`;
                this.outputSkills.appendChild(li);
            }
        });
    }

    private editResume(): void {
        document.querySelector('.input-section')?.scrollIntoView({ behavior: 'smooth' });
    }

    private downloadResume(): void {
        const printWindow = window.open('', '', 'width=800,height=900');
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Resume</title>
                        <style>
                            body { 
                                font-family: 'Times New Roman', Times, serif;
                                max-width: 600px; 
                                margin: 0 auto; 
                                padding: 20px;
                                line-height: 1.6;
                            }
                            .resume-header {
                                display: flex;
                                align-items: center;
                                margin-bottom: 20px;
                                border-bottom: 2px solid #333;
                                padding-bottom: 10px;
                            }
                            .profile-pic {
                                width: 150px;
                                height: 150px;
                                border-radius: 50%;
                                object-fit: cover;
                                margin-right: 20px;
                            }
                            .header-info {
                                flex-grow: 1;
                            }
                            h1 { margin: 0; color: #333; }
                            h2 { color: #444; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                            ul { padding-left: 20px; }
                            li { margin-bottom: 10px; }
                        </style>
                    </head>
                    <body>
                        <div class="resume-header">
                            ${this.profilePicDataUrl ? 
                                `<img src="${this.profilePicDataUrl}" alt="Profile Picture" class="profile-pic">` : 
                                ''
                            }
                            <div class="header-info">
                                <h1>${this.outputName.textContent || ''}</h1>
                                <p>${this.outputEmail.textContent || ''}</p>
                                <p>${this.outputPhone.textContent || ''}</p>
                            </div>
                        </div>
                        
                        <h2>Education</h2>
                        <ul>${this.outputEducation.innerHTML}</ul>
                        
                        <h2>Work Experience</h2>
                        <ul>${this.outputWorkExperience.innerHTML}</ul>
                        
                        <h2>Skills</h2>
                        <ul>${this.outputSkills.innerHTML}</ul>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    }

    private shareResume(): void {
        // Generate a shareable link to the output resume section
        const resumeSection = document.getElementById('output-section');
        if (resumeSection) {
            const shareLink = window.location.href.split('#')[0] + '#output-section';
            
            try {
                navigator.clipboard.writeText(shareLink);
                alert('Link to output resume copied to clipboard!');
            } catch (error) {
                console.error('Failed to copy link', error);
                alert('Could not copy link. Please try again.');
            }
        }
    }

    // Initialize the application
    public static start(): void {
        new ResumeBuilder();
    }
}

// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', ResumeBuilder.start);