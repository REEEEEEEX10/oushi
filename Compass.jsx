import { useState, useEffect, useRef, useMemo } from 'react';

// ============================================================================
// MOCK DATA - Realistic college data for 15 schools
// ============================================================================

const MOCK_SCHOOLS = [
  {
    id: 1,
    name: "Stanford University",
    location: "Stanford, CA",
    costOfLivingIndex: 1.89,
    sticker: 82406,
    images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800"
    ],
    description: "Stanford University is a private research university located in Stanford, California. Known for its academic strength, proximity to Silicon Valley, and entrepreneurial culture.",
    aidByIncome: {
      "0-30k": 7200,
      "30-48k": 8100,
      "48-75k": 12400,
      "75-110k": 18900,
      "110k+": 52300
    },
    acceptanceRate: 3.9,
    acceptanceByGPA: {
      "3.7-4.0": 5.2,
      "3.3-3.7": 1.8,
      "2.9-3.3": 0.4
    },
    retentionRate: 98.1,
    gradRate6yr: 94.7,
    classSizeDistribution: { "under20": 68, "20-49": 24, "50+": 8 },
    housingCost: 1850,
    pgCost: 1200,
    foodCost: 650,
    transportCost: 120,
    reviews: [
      {
        author: "Sarah Chen",
        year: "Class of 2024",
        rating: 5,
        date: "2026-08-10",
        text: "Stanford changed my life. The academic rigor is intense but the support system is incredible. The campus is beautiful and the entrepreneurial spirit is contagious.",
        major: "Computer Science",
        verified: true
      },
      {
        author: "Michael Rodriguez",
        year: "Class of 2023",
        rating: 4,
        date: "2026-07-22",
        text: "Great education and amazing connections. The quarter system moves fast which can be stressful. Housing is expensive but financial aid helps a lot.",
        major: "Economics",
        verified: true
      },
      {
        author: "Priya Sharma",
        year: "Class of 2025",
        rating: 5,
        date: "2026-08-01",
        text: "The opportunities here are unmatched. From research to internships in Silicon Valley, you're constantly surrounded by brilliant minds. Highly recommend.",
        major: "Bioengineering",
        verified: true
      }
    ],
    majors: [
      {
        name: "Computer Science",
        facultyRatio: 7.2,
        avgClassSize: 18,
        notableAlumni: ["Larry Page", "Sergey Brin", "Reid Hoffman"],
        medianSalary2yr: 145000,
        medianSalary6yr: 189000,
        medianSalary10yr: 245000
      },
      {
        name: "Economics",
        facultyRatio: 9.1,
        avgClassSize: 22,
        notableAlumni: ["Peter Thiel", "Phil Knight"],
        medianSalary2yr: 78000,
        medianSalary6yr: 112000,
        medianSalary10yr: 156000
      }
    ],
    deadlines: {
      earlyAction: { date: "2026-11-01", binding: false },
      regularDecision: { date: "2027-01-05", binding: false },
      financialAid: { date: "2027-02-15", binding: false }
    },
    internationalAid: "need-blind",
    debtToIncome: 0.42
  },
  {
    id: 2,
    name: "MIT",
    location: "Cambridge, MA",
    costOfLivingIndex: 1.62,
    sticker: 79850,
    images: [
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800"
    ],
    description: "Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts. Renowned for its engineering, physical sciences, and innovation.",
    aidByIncome: {
      "0-30k": 6800,
      "30-48k": 7500,
      "48-75k": 11200,
      "75-110k": 19800,
      "110k+": 54200
    },
    acceptanceRate: 4.1,
    acceptanceByGPA: {
      "3.7-4.0": 5.8,
      "3.3-3.7": 2.1,
      "2.9-3.3": 0.3
    },
    retentionRate: 99.2,
    gradRate6yr: 96.1,
    classSizeDistribution: { "under20": 62, "20-49": 28, "50+": 10 },
    housingCost: 1650,
    pgCost: 1100,
    foodCost: 600,
    transportCost: 90,
    reviews: [
      {
        author: "Alex Thompson",
        year: "Class of 2024",
        rating: 5,
        date: "2026-08-15",
        text: "MIT is challenging but incredibly rewarding. The collaborative culture means everyone helps each other succeed. Amazing research opportunities from day one.",
        major: "Computer Science",
        verified: true
      },
      {
        author: "Jessica Wu",
        year: "Class of 2023",
        rating: 4,
        date: "2026-07-18",
        text: "Rigorous academics and cutting-edge facilities. The workload is intense but you learn to manage it. Great career prospects after graduation.",
        major: "Mechanical Engineering",
        verified: true
      }
    ],
    majors: [
      {
        name: "Computer Science",
        facultyRatio: 6.8,
        avgClassSize: 16,
        notableAlumni: ["Drew Houston", "Bobby Murphy"],
        medianSalary2yr: 152000,
        medianSalary6yr: 198000,
        medianSalary10yr: 267000
      },
      {
        name: "Mechanical Engineering",
        facultyRatio: 8.2,
        avgClassSize: 19,
        notableAlumni: ["Buzz Aldrin", "Kofi Annan"],
        medianSalary2yr: 89000,
        medianSalary6yr: 125000,
        medianSalary10yr: 168000
      }
    ],
    deadlines: {
      earlyAction: { date: "2026-11-01", binding: false },
      regularDecision: { date: "2027-01-01", binding: false },
      financialAid: { date: "2027-02-15", binding: false }
    },
    internationalAid: "need-blind",
    debtToIncome: 0.38
  },
  {
    id: 3,
    name: "Harvard University",
    location: "Cambridge, MA",
    costOfLivingIndex: 1.62,
    sticker: 79450,
    images: [
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800",
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800",
      "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800"
    ],
    description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. The oldest institution of higher learning in the United States.",
    aidByIncome: {
      "0-30k": 5200,
      "30-48k": 6100,
      "48-75k": 9800,
      "75-110k": 18200,
      "110k+": 51400
    },
    acceptanceRate: 3.4,
    acceptanceByGPA: {
      "3.7-4.0": 4.8,
      "3.3-3.7": 1.2,
      "2.9-3.3": 0.2
    },
    retentionRate: 98.5,
    gradRate6yr: 97.6,
    classSizeDistribution: { "under20": 71, "20-49": 21, "50+": 8 },
    housingCost: 1700,
    pgCost: 1150,
    foodCost: 620,
    transportCost: 90,
    reviews: [
      {
        author: "David Kim",
        year: "Class of 2025",
        rating: 5,
        date: "2026-08-05",
        text: "Harvard's resources are unmatched. From the libraries to the guest speakers to the alumni network, everything is world-class. The house system creates a tight-knit community.",
        major: "Economics",
        verified: true
      },
      {
        author: "Emma Johnson",
        year: "Class of 2024",
        rating: 4,
        date: "2026-07-28",
        text: "Incredible academic experience with access to brilliant professors. Cambridge is expensive but the financial aid is generous. Very competitive environment.",
        major: "Computer Science",
        verified: true
      }
    ],
    majors: [
      {
        name: "Economics",
        facultyRatio: 8.9,
        avgClassSize: 21,
        notableAlumni: ["Mark Zuckerberg", "Bill Gates"],
        medianSalary2yr: 82000,
        medianSalary6yr: 118000,
        medianSalary10yr: 172000
      },
      {
        name: "Computer Science",
        facultyRatio: 7.6,
        avgClassSize: 20,
        notableAlumni: ["Bill Gates", "Mark Zuckerberg"],
        medianSalary2yr: 142000,
        medianSalary6yr: 187000,
        medianSalary10yr: 241000
      }
    ],
    deadlines: {
      earlyAction: { date: "2026-11-01", binding: false },
      regularDecision: { date: "2027-01-01", binding: false },
      financialAid: { date: "2027-02-01", binding: false }
    },
    internationalAid: "need-blind",
    debtToIncome: 0.35
  },
  {
    id: 4,
    name: "UC Berkeley",
    location: "Berkeley, CA",
    costOfLivingIndex: 1.82,
    sticker: 44007,
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
    ],
    description: "University of California, Berkeley is a public research university in Berkeley, California. Known for its academic excellence and activism.",
    aidByIncome: {
      "0-30k": 8900,
      "30-48k": 12300,
      "48-75k": 18700,
      "75-110k": 28400,
      "110k+": 38200
    },
    acceptanceRate: 14.5,
    acceptanceByGPA: {
      "3.7-4.0": 18.2,
      "3.3-3.7": 8.4,
      "2.9-3.3": 2.1
    },
    retentionRate: 96.8,
    gradRate6yr: 92.4,
    classSizeDistribution: { "under20": 58, "20-49": 28, "50+": 14 },
    housingCost: 1500,
    pgCost: 950,
    foodCost: 580,
    transportCost: 100,
    reviews: [
      {
        author: "Ryan Patel",
        year: "Class of 2024",
        rating: 4,
        date: "2026-08-12",
        text: "Berkeley offers incredible value for a top-tier education. Large class sizes in lower-division courses but amazing opportunities in upper-division. The campus culture is vibrant.",
        major: "Computer Science",
        verified: true
      },
      {
        author: "Sophie Anderson",
        year: "Class of 2023",
        rating: 5,
        date: "2026-07-30",
        text: "Go Bears! Berkeley is what you make of it. If you're proactive, the opportunities are endless. Great location in the Bay Area for internships.",
        major: "Business Administration",
        verified: true
      }
    ],
    majors: [
      {
        name: "Computer Science",
        facultyRatio: 12.4,
        avgClassSize: 28,
        notableAlumni: ["Steve Wozniak", "Eric Schmidt"],
        medianSalary2yr: 138000,
        medianSalary6yr: 176000,
        medianSalary10yr: 223000
      },
      {
        name: "Business Administration",
        facultyRatio: 10.2,
        avgClassSize: 32,
        notableAlumni: ["Paul Otellini", "Lyor Cohen"],
        medianSalary2yr: 74000,
        medianSalary6yr: 108000,
        medianSalary10yr: 148000
      }
    ],
    deadlines: {
      regularDecision: { date: "2026-11-30", binding: false },
      financialAid: { date: "2027-03-02", binding: false }
    },
    internationalAid: "none",
    debtToIncome: 0.52
  },
  {
    id: 5,
    name: "University of Lucknow",
    location: "Lucknow, Uttar Pradesh, India",
    costOfLivingIndex: 0.18,
    sticker: 850,
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800"
    ],
    description: "University of Lucknow is a public state university based in Lucknow, the capital of Uttar Pradesh, India. Established in 1920, it is one of the oldest institutions of higher education in India.",
    aidByIncome: {
      "0-30k": 200,
      "30-48k": 300,
      "48-75k": 500,
      "75-110k": 700,
      "110k+": 850
    },
    acceptanceRate: 45.0,
    acceptanceByGPA: {
      "3.7-4.0": 85.0,
      "3.3-3.7": 65.0,
      "2.9-3.3": 35.0
    },
    retentionRate: 88.5,
    gradRate6yr: 78.2,
    classSizeDistribution: { "under20": 15, "20-49": 35, "50+": 50 },
    housingCost: 120,
    pgCost: 80,
    foodCost: 60,
    transportCost: 15,
    reviews: [
      {
        author: "Rahul Verma",
        year: "Class of 2024",
        rating: 4,
        date: "2026-08-10",
        text: "Great university with rich history. The faculty is experienced and the campus is beautiful. Lucknow is affordable and the food scene is amazing. Good balance of academics and culture.",
        major: "Commerce",
        verified: true
      },
      {
        author: "Anjali Singh",
        year: "Class of 2023",
        rating: 3,
        date: "2026-07-25",
        text: "Good education at very affordable cost. Infrastructure could be better but the university has a strong reputation. The city of Lucknow offers good opportunities.",
        major: "Arts",
        verified: true
      },
      {
        author: "Vikram Sharma",
        year: "Class of 2025",
        rating: 4,
        date: "2026-08-05",
        text: "One of the best universities in UP. Excellent faculty in law and arts departments. PG accommodation is cheap and easily available. Great cultural environment.",
        major: "Law",
        verified: true
      }
    ],
    majors: [
      {
        name: "Commerce",
        facultyRatio: 25.0,
        avgClassSize: 60,
        notableAlumni: ["Various business leaders"],
        medianSalary2yr: 8000,
        medianSalary6yr: 15000,
        medianSalary10yr: 28000
      },
      {
        name: "Arts",
        facultyRatio: 28.0,
        avgClassSize: 55,
        notableAlumni: ["Amitabh Bachchan (attended)"],
        medianSalary2yr: 6500,
        medianSalary6yr: 12000,
        medianSalary10yr: 22000
      },
      {
        name: "Law",
        facultyRatio: 20.0,
        avgClassSize: 45,
        notableAlumni: ["Various judges and lawyers"],
        medianSalary2yr: 12000,
        medianSalary6yr: 25000,
        medianSalary10yr: 48000
      }
    ],
    deadlines: {
      regularDecision: { date: "2026-06-30", binding: false },
      financialAid: { date: "2026-07-15", binding: false }
    },
    internationalAid: "limited",
    debtToIncome: 0.15
  }
];

const ALL_SCHOOLS = [...MOCK_SCHOOLS];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatCurrency = (num) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(num);
};

const formatPercent = (num) => {
  return `${num.toFixed(1)}%`;
};

const getDaysUntil = (dateStr) => {
  const target = new Date(dateStr);
  const now = new Date('2026-08-25');
  const diff = target - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// ============================================================================
// INTERSECTION OBSERVER HOOK
// ============================================================================

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [targetRef, isIntersecting];
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function Compass() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'detail'
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [savedSchools, setSavedSchools] = useState([]);
  const [compareSchools, setCompareSchools] = useState([]);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [userProfile, setUserProfile] = useState({
    income: '75-110k',
    gpa: '3.7-4.0',
    isInternational: false
  });
  const [fitWeights, setFitWeights] = useState({
    academics: 30,
    cost: 25,
    location: 15,
    size: 10,
    outcomes: 20
  });
  const [selectedMajor, setSelectedMajor] = useState('Computer Science');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll handler for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSaveSchool = (schoolId) => {
    setSavedSchools(prev =>
      prev.includes(schoolId)
        ? prev.filter(id => id !== schoolId)
        : [...prev, schoolId]
    );
  };

  const calculateFitScore = (school) => {
    const academicsScore = (100 - school.acceptanceRate * 2) / 10;
    const costScore = (80000 - school.aidByIncome[userProfile.income]) / 8000;
    const locationScore = (2 - school.costOfLivingIndex) * 5;
    const sizeScore = school.classSizeDistribution['under20'] / 10;
    const major = school.majors.find(m => m.name === selectedMajor) || school.majors[0];
    const outcomesScore = (major.medianSalary10yr / 25000);

    const total = (
      (academicsScore * fitWeights.academics / 100) +
      (Math.max(0, costScore) * fitWeights.cost / 100) +
      (Math.max(0, locationScore) * fitWeights.location / 100) +
      (sizeScore * fitWeights.size / 100) +
      (outcomesScore * fitWeights.outcomes / 100)
    );

    return Math.min(10, Math.max(0, total));
  };

  const viewSchoolDetail = (school) => {
    setSelectedSchool(school);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setCurrentView('home');
    setSelectedSchool(null);
    window.scrollTo(0, 0);
  };

  const sortedSchools = useMemo(() => {
    let filtered = ALL_SCHOOLS;

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => calculateFitScore(b) - calculateFitScore(a));
  }, [fitWeights, userProfile, selectedMajor, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif' }}>

      {/* NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isNavScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={goHome}
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Compass
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={goHome} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</button>
            <button onClick={() => document.getElementById('search')?.scrollIntoView({behavior: 'smooth'})} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Search</button>
            <button onClick={() => document.getElementById('compare')?.scrollIntoView({behavior: 'smooth'})} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Compare</button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg transition-all transform hover:scale-105">
              My List ({savedSchools.length})
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      {currentView === 'home' ? (
        <HomePage
          sortedSchools={sortedSchools}
          viewSchoolDetail={viewSchoolDetail}
          savedSchools={savedSchools}
          toggleSaveSchool={toggleSaveSchool}
          calculateFitScore={calculateFitScore}
          fitWeights={fitWeights}
          setFitWeights={setFitWeights}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          selectedMajor={selectedMajor}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      ) : (
        <SchoolDetailPage
          school={selectedSchool}
          goHome={goHome}
          savedSchools={savedSchools}
          toggleSaveSchool={toggleSaveSchool}
          userProfile={userProfile}
        />
      )}
    </div>
  );
}

// ============================================================================
// HOME PAGE
// ============================================================================

function HomePage({ sortedSchools, viewSchoolDetail, savedSchools, toggleSaveSchool, calculateFitScore, fitWeights, setFitWeights, userProfile, setUserProfile, selectedMajor, searchQuery, setSearchQuery }) {
  return (
    <>
      {/* HERO */}
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* QUICK STATS */}
      <QuickStatsSection schools={sortedSchools} />

      {/* PROFILE SETUP */}
      <ProfileSection userProfile={userProfile} setUserProfile={setUserProfile} />

      {/* FIT WEIGHTS */}
      <FitScoreSection fitWeights={fitWeights} setFitWeights={setFitWeights} />

      {/* SCHOOL CARDS */}
      <section id="search" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Personalized matches
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Ranked by your unique fit score
          </p>

          {sortedSchools.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No universities found</h3>
              <p className="text-gray-600 mb-6">Try searching for: Stanford, MIT, Harvard, UC Berkeley, or University of Lucknow</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedSchools.map((school, idx) => {
              const fitScore = calculateFitScore(school);
              const avgRating = school.reviews ? (school.reviews.reduce((acc, r) => acc + r.rating, 0) / school.reviews.length).toFixed(1) : 'N/A';

              return (
                <div
                  key={school.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                  onClick={() => viewSchoolDetail(school)}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.05}s both`
                  }}
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
                    <img
                      src={school.images?.[0] || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'}
                      alt={school.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 font-bold text-lg">
                      <span className="text-blue-600">{fitScore.toFixed(1)}</span>
                      <span className="text-gray-400 text-sm">/10</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {school.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {school.location}
                    </div>

                    {school.reviews && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(avgRating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{avgRating}</span>
                        <span className="text-sm text-gray-500">({school.reviews.length} reviews)</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(school.aidByIncome[userProfile.income])}
                        </div>
                        <div className="text-xs text-gray-500">Net price</div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveSchool(school.id);
                        }}
                        className={`p-3 rounded-full transition-all transform hover:scale-110 ${
                          savedSchools.includes(school.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                        }`}
                      >
                        <svg className="w-5 h-5" fill={savedSchools.includes(school.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ============================================================================
// SCHOOL DETAIL PAGE
// ============================================================================

function SchoolDetailPage({ school, goHome, savedSchools, toggleSaveSchool, userProfile }) {
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!school) return null;

  const netPrice = school.aidByIncome[userProfile.income];
  const totalMonthlyCost = school.housingCost + school.foodCost + school.transportCost;
  const avgRating = school.reviews ? (school.reviews.reduce((acc, r) => acc + r.rating, 0) / school.reviews.length).toFixed(1) : 'N/A';

  return (
    <div className="pt-16">
      {/* HERO IMAGE GALLERY */}
      <div className="relative h-[70vh] bg-gradient-to-br from-blue-900 to-indigo-900">
        <img
          src={school.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200'}
          alt={school.name}
          className="w-full h-full object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={goHome}
              className="mb-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to search
            </button>

            <h1 className="text-6xl font-bold text-white mb-4">{school.name}</h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {school.location}
              </div>
              {school.reviews && (
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(avgRating) ? 'fill-current' : 'fill-gray-400'}`} viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-medium">{avgRating}</span>
                  <span>({school.reviews.length} reviews)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Navigation */}
        {school.images && school.images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {school.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-12">
            {/* OVERVIEW */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{school.description}</p>
            </section>

            {/* COST BREAKDOWN */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Cost Breakdown</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-sm text-gray-600 mb-2">Annual Tuition (Your Net Price)</div>
                  <div className="text-4xl font-bold text-blue-600">{formatCurrency(netPrice)}</div>
                  <div className="text-sm text-gray-500 mt-2 line-through">{formatCurrency(school.sticker)} sticker price</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-sm text-gray-600 mb-2">Monthly Living Cost</div>
                  <div className="text-4xl font-bold text-indigo-600">{formatCurrency(totalMonthlyCost)}</div>
                  <div className="text-sm text-gray-500 mt-2">Housing + Food + Transport</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-medium text-gray-700">🏠 Housing (on-campus)</span>
                  <span className="font-bold text-gray-900">{formatCurrency(school.housingCost)}/mo</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-medium text-gray-700">🏘️ PG/Off-campus</span>
                  <span className="font-bold text-gray-900">{formatCurrency(school.pgCost)}/mo</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-medium text-gray-700">🍽️ Food & Dining</span>
                  <span className="font-bold text-gray-900">{formatCurrency(school.foodCost)}/mo</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-medium text-gray-700">🚌 Transportation</span>
                  <span className="font-bold text-gray-900">{formatCurrency(school.transportCost)}/mo</span>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-bold text-green-900">Worth It?</span>
                </div>
                <p className="text-green-800">
                  With a debt-to-income ratio of {school.debtToIncome.toFixed(2)}, this investment is{' '}
                  {school.debtToIncome < 0.5 ? 'considered manageable' : 'on the higher side'}.
                  {' '}Graduates typically earn enough to manage their debt comfortably.
                </p>
              </div>
            </section>

            {/* REVIEWS */}
            {school.reviews && (
              <section className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Student Reviews</h2>

                <div className="space-y-6">
                  {school.reviews.map((review, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-gray-900">{review.author}</span>
                            {review.verified && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {review.major} • {review.year}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* MAJORS */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Programs & Outcomes</h2>

              <div className="space-y-6">
                {school.majors.map((major, idx) => (
                  <div key={idx} className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{major.name}</h3>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Faculty Ratio</div>
                        <div className="text-lg font-bold text-gray-900">1:{major.facultyRatio}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Avg Class Size</div>
                        <div className="text-lg font-bold text-gray-900">{major.avgClassSize}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">10-Year Salary</div>
                        <div className="text-lg font-bold text-green-600">{formatCurrency(major.medianSalary10yr)}</div>
                      </div>
                    </div>

                    {major.notableAlumni && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Notable Alumni:</span> {major.notableAlumni.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* ACTIONS */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <button
                  onClick={() => toggleSaveSchool(school.id)}
                  className={`w-full py-3 rounded-xl font-bold text-lg mb-3 transition-all transform hover:scale-105 ${
                    savedSchools.includes(school.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {savedSchools.includes(school.id) ? '❤️ Saved' : '🤍 Save School'}
                </button>

                <button
                  onClick={() => setShowAdmissionForm(true)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Interested in Admission?
                </button>
              </div>

              {/* QUICK STATS */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">
                <h3 className="font-bold text-xl mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Acceptance Rate</span>
                    <span className="font-bold">{formatPercent(school.acceptanceRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retention Rate</span>
                    <span className="font-bold">{formatPercent(school.retentionRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>6-Year Grad Rate</span>
                    <span className="font-bold">{formatPercent(school.gradRate6yr)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Small Classes</span>
                    <span className="font-bold">{school.classSizeDistribution['under20']}%</span>
                  </div>
                </div>
              </div>

              {/* DEADLINES */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900">Important Deadlines</h3>
                <div className="space-y-3">
                  {Object.entries(school.deadlines).map(([key, value]) => {
                    const days = getDaysUntil(value.date);
                    return (
                      <div key={key} className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                          {value.binding && <span className="text-red-600 ml-1">(Binding)</span>}
                        </div>
                        <div className="text-lg font-bold text-blue-600">{value.date}</div>
                        <div className="text-xs text-gray-600">{days} days remaining</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ADMISSION INTEREST MODAL */}
      {showAdmissionForm && (
        <AdmissionInterestModal school={school} onClose={() => setShowAdmissionForm(false)} />
      )}
    </div>
  );
}

// ============================================================================
// COMPONENT: ADMISSION INTEREST MODAL
// ============================================================================

function AdmissionInterestModal({ school, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    intendedMajor: '',
    gpa: '',
    hasVisited: '',
    specificQuestions: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! A counselor will contact you within 24 hours.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Admission Interest - {school.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Intended Major</label>
            <select
              value={formData.intendedMajor}
              onChange={(e) => setFormData({...formData, intendedMajor: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a major</option>
              {school.majors.map((major, idx) => (
                <option key={idx} value={major.name}>{major.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current GPA</label>
            <input
              type="text"
              value={formData.gpa}
              onChange={(e) => setFormData({...formData, gpa: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3.8"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Have you visited campus?</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="yes"
                  checked={formData.hasVisited === 'yes'}
                  onChange={(e) => setFormData({...formData, hasVisited: e.target.value})}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  checked={formData.hasVisited === 'no'}
                  onChange={(e) => setFormData({...formData, hasVisited: e.target.value})}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specific Questions or Concerns</label>
            <textarea
              value={formData.specificQuestions}
              onChange={(e) => setFormData({...formData, specificQuestions: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="What would you like to know about admission, financial aid, or campus life?"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Submit Interest
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

function HeroSection({ searchQuery, setSearchQuery }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 pt-16 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div
        className="text-center max-w-5xl relative z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <h1 className="text-7xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Find your perfect
          </span>
          <br />
          <span className="text-gray-900">college match</span>
        </h1>

        <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
          Real costs. Real reviews. Real outcomes.<br/>
          <span className="text-blue-600 font-semibold">No black-box rankings.</span>
        </p>

        {/* SEARCH BAR */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any university..."
              className="w-full px-6 py-5 pl-14 text-lg rounded-2xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-lg"
            />
            <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          <span className="font-medium">Try searching:</span>
          {['Stanford', 'MIT', 'University of Lucknow', 'UC Berkeley'].map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-4 py-2 bg-white rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStatsSection({ schools }) {
  const [ref, isVisible] = useIntersectionObserver();

  const totalSchools = schools.length;
  const avgAcceptance = (schools.reduce((acc, s) => acc + s.acceptanceRate, 0) / totalSchools).toFixed(1);
  const lowestCost = Math.min(...schools.map(s => s.aidByIncome['75-110k']));

  return (
    <section ref={ref} className="py-24 px-6">
      <div
        className="max-w-7xl mx-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-5xl font-bold mb-2">{totalSchools}+</div>
            <div className="text-blue-100">Universities in database</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-5xl font-bold mb-2">{avgAcceptance}%</div>
            <div className="text-purple-100">Average acceptance rate</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-5xl font-bold mb-2">{formatCurrency(lowestCost)}</div>
            <div className="text-green-100">Lowest net price option</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileSection({ userProfile, setUserProfile }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section ref={ref} className="py-24 px-6 bg-white">
      <div
        className="max-w-5xl mx-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Tell us about yourself
          </h2>
          <p className="text-xl text-gray-600">We'll personalize your results</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-100">
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold mb-4 text-gray-900">Family Income Bracket</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {['0-30k', '30-48k', '48-75k', '75-110k', '110k+'].map(bracket => (
                  <button
                    key={bracket}
                    onClick={() => setUserProfile({...userProfile, income: bracket})}
                    className={`px-4 py-4 rounded-xl text-base font-medium transition-all transform hover:scale-105 ${
                      userProfile.income === bracket
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-white hover:bg-gray-50 text-gray-900 shadow'
                    }`}
                  >
                    ${bracket}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-4 text-gray-900">GPA Range</label>
              <div className="grid grid-cols-3 gap-4">
                {['3.7-4.0', '3.3-3.7', '2.9-3.3'].map(gpa => (
                  <button
                    key={gpa}
                    onClick={() => setUserProfile({...userProfile, gpa})}
                    className={`px-6 py-4 rounded-xl text-base font-medium transition-all transform hover:scale-105 ${
                      userProfile.gpa === gpa
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-white hover:bg-gray-50 text-gray-900 shadow'
                    }`}
                  >
                    {gpa}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FitScoreSection({ fitWeights, setFitWeights }) {
  const [ref, isVisible] = useIntersectionObserver();

  const updateWeight = (key, value) => {
    setFitWeights(prev => ({...prev, [key]: parseInt(value)}));
  };

  const total = Object.values(fitWeights).reduce((a, b) => a + b, 0);

  const weightConfig = {
    academics: { label: 'Academic Excellence', icon: '🎓', color: 'blue' },
    cost: { label: 'Affordability', icon: '💰', color: 'green' },
    location: { label: 'Location & Living', icon: '📍', color: 'purple' },
    size: { label: 'Class Size', icon: '👥', color: 'orange' },
    outcomes: { label: 'Career Outcomes', icon: '📈', color: 'red' }
  };

  return (
    <section ref={ref} className="py-24 px-6">
      <div
        className="max-w-5xl mx-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            What matters most to you?
          </h2>
          <p className="text-xl text-gray-600">Adjust the sliders to personalize your fit score</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="space-y-8">
            {Object.entries(fitWeights).map(([key, value]) => {
              const config = weightConfig[key];
              return (
                <div key={key} className="relative">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{config.icon}</span>
                      <span className="text-lg font-semibold text-gray-900">{config.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-900">{value}</span>
                      <span className="text-gray-500">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => updateWeight(key, e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${value}%, rgb(229, 231, 235) ${value}%, rgb(229, 231, 235) 100%)`
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className={`mt-8 p-4 rounded-xl text-center font-bold text-lg ${
            total === 100
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            Total: {total}% {total !== 100 && '(must equal 100%)'}
          </div>
        </div>
      </div>
    </section>
  );
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
