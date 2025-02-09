# **Construction Career Survey** 🏗️

## _A Multi-Step Career Assessment Tool_

### **Overview**
This project is a **React-based career survey application** specifically designed for the construction industry. It helps match construction workers with career paths based on their personality traits, skills, and preferences.

### **Features**
* 📋 **Multi-Step Survey**
  * Personal Information
  * Personality Assessment (Myers-Briggs & Holland Code)
  * Skills & Experience Evaluation
  * Work Preferences
  * Career Goals

* 📊 **Comprehensive Recommendations**
  * Career Path Suggestions
  * Training Recommendations
  * Certification Roadmaps
  * Networking Opportunities
  * Industry Event Calendar

* 📱 **User Experience**
  * Responsive Design
  * Progress Tracking
  * PDF Report Generation
  * Print-Friendly Format

### **Tech Stack**
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Authentication:** Firebase Auth
- **Database:** Firebase Firestore
- **PDF Generation:** jsPDF + html2canvas
- **Deployment:** Netlify

### **Getting Started**

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

### **Project Structure**
```
src/
├── components/         # React components
│   ├── steps/         # Survey step components
│   └── ...           
├── context/           # React context providers
├── config/            # Configuration files
├── data/             # Static data and constants
└── styles/           # CSS and style files
```

### **Key Features**
* **Survey Steps**
  * Personal Information Collection
  * Personality Assessment
  * Skills & Experience Evaluation
  * Work Preferences
  * Career Goals

* **Recommendations**
  * Career Path Suggestions
  * Training Resources
  * Certification Paths
  * Industry Events
  * Networking Opportunities

* **Resource Sections**
  * Education Resources
  * Job Boards
  * Professional Associations
  * Technology Training
  * Mentorship Programs
  * Industry Trends
  * Regional Insights
  * Success Stories
  * Work-Life Balance
  * Financial Planning

### **Deployment**
The application is deployed on Netlify with continuous deployment from the main branch.

[![Netlify Status](https://api.netlify.com/api/v1/badges/70562caf-0ffe-42fc-9684-a564378034a0/deploy-status)](https://app.netlify.com/sites/career-survey/deploys)

### **Contributing**
Contributions are welcome! Please feel free to submit a Pull Request.

### **License**
This project is licensed under the MIT License - see the LICENSE file for details.
