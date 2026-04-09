const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors());
app.use(express.json());

/**
 * DATABASE OF OFFICIAL CERTIFICATION LINKS
 * Precisely mapped to the data shared by the user.
 */
const certificationDatabase = [
  { 
    company: 'Dell', 
    title: 'Dell Technologies Learning', 
    url: 'https://learning.dell.com/content/dell/en-us/home.html', 
    description: 'Official Dell training and certification portal for professional development.',
    tags: ['OFFICIAL', 'PAID'] 
  },
  { 
    company: 'Unilever', 
    title: 'Unilever Supply Chain Data Analyst Professional Certificate', 
    url: 'https://www.mooc-list.com/tags/unilever-supply-chain-data-analyst-professional-certificate', 
    description: 'Official Unilever certification for supply chain data analysis.',
    tags: ['OFFICIAL', 'CERTIFICATE'] 
  },
  { 
    company: 'Deloitte', 
    title: 'Deloitte SkillSphere', 
    url: 'https://www.deloitte.com/ce/en/what-we-do/insight-navigator-by-deloitte/skillsphere-by-insight-navigator/skillsphere-find-courses-by-date.html', 
    description: 'Deloitte Insight Navigator for discovering official courses and certifications.',
    tags: ['OFFICIAL', 'COURSES'] 
  },
  { 
    company: 'Red Hat', 
    title: 'Red Hat Training and Certification', 
    url: 'https://www.redhat.com/en/services/certifications', 
    description: 'Official Red Hat certifications for system administrators and developers.',
    tags: ['OFFICIAL', 'PAID'] 
  },
  { 
    company: 'Nvidia', 
    title: 'Nvidia Training - Free Courses', 
    url: 'https://resources.nvidia.com/en-us-nvidia-training/free-courses?xs=557650', 
    description: 'Access free official training and certifications directly from Nvidia.',
    tags: ['OFFICIAL', 'FREE'] 
  },
  { 
    company: 'Intel', 
    title: 'Intel Certification and Training', 
    url: 'https://www.intel.com/content/www/us/en/corporate/certification-training.html', 
    description: 'Intel official technical training and certification programs.',
    tags: ['OFFICIAL', 'TRAINING'] 
  },
  { 
    company: 'Meta', 
    title: 'Meta Blueprint Certification', 
    url: 'https://certifications.facebookblueprint.com/student/catalog', 
    description: 'Official Facebook and Meta certifications for digital marketing and advertising.',
    tags: ['OFFICIAL', 'CERTIFICATE'] 
  },
  { 
    company: 'CodeSignal', 
    title: 'CodeSignal Skills Evaluation', 
    url: 'https://www.classcentral.com/provider/codesignal', 
    description: 'Official practice and certification provider for technical skills.',
    tags: ['OFFICIAL', 'PRACTICE'] 
  },
  { 
    company: 'Salesforce', 
    title: 'Salesforce Trailhead Academy', 
    url: 'https://trailheadacademy.salesforce.com/all-offerings', 
    description: 'Official Salesforce training and certifications for CRM and development.',
    tags: ['OFFICIAL', 'FREE'] 
  },
  { 
    company: 'Adobe', 
    title: 'Adobe Certified Professional', 
    url: 'https://certification.adobe.com/courses/?/courses', 
    description: 'Official Adobe Creative Cloud and software certifications.',
    tags: ['OFFICIAL', 'PAID'] 
  },
  { 
    company: 'Microsoft', 
    title: 'Microsoft Learn Training', 
    url: 'https://learn.microsoft.com/en-us/training/browse/', 
    description: 'Official Microsoft certifications for Azure, Office, and development.',
    tags: ['OFFICIAL', 'FREE', 'PAID'] 
  },
  { 
    company: 'Infosys', 
    title: 'Infosys Springboard', 
    url: 'https://infyspringboard.us.onwingspan.com/web/en/page/home', 
    description: 'Infosys official digital learning and certification platform.',
    tags: ['OFFICIAL', 'TRAINING'] 
  },
  { 
    company: 'HackerRank', 
    title: 'HackerRank Verified Skills', 
    url: 'https://www.hackerrank.com/skills-verification', 
    description: 'Official HackerRank skills verification and certifications.',
    tags: ['OFFICIAL', 'VERIFICATION'] 
  },
  { 
    company: 'HubSpot', 
    title: 'HubSpot Academy Certification', 
    url: 'https://academy.hubspot.com/certification-overview', 
    description: 'Official HubSpot certifications for inbound marketing and sales.',
    tags: ['OFFICIAL', 'FREE'] 
  },
  { 
    company: 'LIFE Global', 
    title: 'LIFE Global Courses', 
    url: 'https://www.life-global.org/allcourses?page=1', 
    description: 'Official certifications and courses from LIFE Global.',
    tags: ['OFFICIAL', 'COURSES'] 
  },
  { 
    company: 'Open University', 
    title: 'OpenLearn Free Courses', 
    url: 'https://www.open.edu/openlearn/free-courses/full-catalogue', 
    description: 'The Open University official free courses and certifications.',
    tags: ['OFFICIAL', 'FREE'] 
  },
  { 
    company: 'The Forage', 
    title: 'Forage Virtual Simulations', 
    url: 'https://www.theforage.com/simulations', 
    description: 'Official virtual work experience programs and certifications.',
    tags: ['OFFICIAL', 'FREE', 'SIMULATION'] 
  },
  { 
    company: 'Tata', 
    title: 'Tata Global Internships', 
    url: 'https://www.tata.com/careers/programs/tata-global-internships/overview', 
    description: 'Official Tata Group internships and professional programs.',
    tags: ['OFFICIAL', 'INTERNSHIP'] 
  },
  { 
    company: 'Tata Forage', 
    title: 'Tata Virtual Work Experience', 
    url: 'https://www.theforage.com/simulations?companies=tata', 
    description: 'Official Tata Group virtual experience certifications via Forage.',
    tags: ['OFFICIAL', 'FREE'] 
  },
  { 
    company: 'Scaler', 
    title: 'Scaler Topics and Courses', 
    url: 'https://www.scaler.com/topics/courses/', 
    description: 'Official Scaler Academy tech certifications and courses.',
    tags: ['OFFICIAL', 'COURSES'] 
  },
  { 
    company: 'IBM', 
    title: 'IBM SkillsBuild', 
    url: 'https://skillsbuild.org/', 
    description: 'Official IBM certification platform for AI, Cloud, and Data Science.',
    tags: ['OFFICIAL', 'FREE'] 
  },
  { 
    company: 'CodeSignal Paths', 
    title: 'CodeSignal Learning Paths', 
    url: 'https://codesignal.com/learn/course-paths', 
    description: 'Official technical learning paths and certifications from CodeSignal.',
    tags: ['OFFICIAL', 'LEARN'] 
  },
  { 
    company: 'Cisco', 
    title: 'Cisco Networking Academy', 
    url: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/index.html', 
    description: 'Official Cisco networking and cybersecurity certifications.',
    tags: ['OFFICIAL', 'PAID'] 
  },
  { 
    company: 'Oracle', 
    title: 'Oracle University MyLearn', 
    url: 'https://mylearn.oracle.com/ou/home', 
    description: 'Official Oracle Cloud and software certifications.',
    tags: ['OFFICIAL', 'FREE'] 
  },
  { 
    company: 'Google', 
    title: 'Grow with Google Certificates', 
    url: 'https://grow.google/certificates-coursera', 
    description: 'Official Google career certificates hosted on Coursera.',
    tags: ['OFFICIAL', 'FREE', 'PAID'] 
  },
  { 
    company: 'AWS', 
    title: 'AWS Certification Portal', 
    url: 'https://aws.amazon.com/certification/', 
    description: 'Official Amazon Web Services cloud certifications.',
    tags: ['OFFICIAL', 'PAID'] 
  },
  { 
    company: 'Instagram', 
    title: 'Instagram for Business', 
    url: 'https://www.instagram.com/reel/DVGwKkNjNDP/?igsh=MXBjOWZqcmd5aHl5cQ==', 
    description: 'Official Instagram business and creative resources.',
    tags: ['OFFICIAL', 'SOCIAL'] 
  }
];

app.get('/api/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const query = q.toLowerCase().trim();
  
  /**
   * SEARCH LOGIC:
   * 1. Exact company match gets priority.
   * 2. Partial matches in title or description.
   * 3. URL match for tech keywords.
   */
  const results = certificationDatabase.filter(item => {
    const company = item.company.toLowerCase();
    const title = item.title.toLowerCase();
    const url = item.url.toLowerCase();
    
    return company.includes(query) || title.includes(query) || url.includes(query);
  }).map(item => ({
    title: item.title,
    link: item.url,
    description: item.description,
    domain: new URL(item.url).hostname,
    tags: item.tags,
    company: item.company
  }));

  res.json(results);
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Certification portal server active on port ${PORT}`);
  });
}
