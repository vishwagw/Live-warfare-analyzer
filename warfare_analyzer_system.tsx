import React, { useState, useEffect } from 'react';
import { Globe, AlertTriangle, Clock, MapPin, ExternalLink, RefreshCw, Filter } from 'lucide-react';

const ConflictMonitoringSystem = () => {
  const [activeConflicts, setActiveConflicts] = useState([
    {
      id: 1,
      name: "Russia-Ukraine War",
      region: "Eastern Europe",
      status: "Active",
      intensity: "High",
      startDate: "2022-02-24",
      coordinates: [49.8397, 24.0297],
      lastUpdate: "2 hours ago",
      casualties: "Ongoing assessment",
      keyDevelopments: [
        "Continued fighting in eastern regions",
        "Humanitarian aid corridors established",
        "International sanctions maintained"
      ]
    },
    {
      id: 2,
      name: "Gaza Conflict",
      region: "Middle East",
      status: "Monitoring",
      intensity: "Variable",
      startDate: "2023-10-07",
      coordinates: [31.3547, 34.3088],
      lastUpdate: "45 minutes ago",
      casualties: "Under assessment",
      keyDevelopments: [
        "Ceasefire negotiations ongoing",
        "Humanitarian aid distribution",
        "International mediation efforts"
      ]
    },
    {
      id: 3,
      name: "Myanmar Civil Unrest",
      region: "Southeast Asia",
      status: "Active",
      intensity: "Medium",
      startDate: "2021-02-01",
      coordinates: [19.7633, 96.0785],
      lastUpdate: "3 hours ago",
      casualties: "Estimated thousands",
      keyDevelopments: [
        "Resistance movements active",
        "Refugee displacement continues",
        "International sanctions imposed"
      ]
    },
    {
      id: 4,
      name: "Sudan Conflict",
      region: "Northeast Africa",
      status: "Active",
      intensity: "High",
      startDate: "2023-04-15",
      coordinates: [15.5007, 32.5599],
      lastUpdate: "1 hour ago",
      casualties: "Thousands displaced",
      keyDevelopments: [
        "Fighting between military factions",
        "Civilian evacuation efforts",
        "Regional mediation attempts"
      ]
    }
  ]);

  const [newsHeadlines, setNewsHeadlines] = useState([
    {
      id: 1,
      title: "International Peacekeeping Forces Deploy to Border Region",
      source: "Reuters",
      timestamp: "1 hour ago",
      region: "Eastern Europe",
      priority: "High"
    },
    {
      id: 2,
      title: "Humanitarian Aid Reaches Affected Civilian Areas",
      source: "BBC News",
      timestamp: "2 hours ago",
      region: "Middle East",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Regional Leaders Call for Emergency Summit",
      source: "Al Jazeera",
      timestamp: "3 hours ago",
      region: "Northeast Africa",
      priority: "High"
    },
    {
      id: 4,
      title: "Sanctions Package Approved by International Coalition",
      source: "CNN",
      timestamp: "4 hours ago",
      region: "Southeast Asia",
      priority: "Medium"
    }
  ]);

  const [selectedRegion, setSelectedRegion] = useState('All');
  const [intensityFilter, setIntensityFilter] = useState('All');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const regions = ['All', 'Eastern Europe', 'Middle East', 'Southeast Asia', 'Northeast Africa'];
  const intensityLevels = ['All', 'High', 'Medium', 'Low'];

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-red-600 bg-red-100';
      case 'Monitoring': return 'text-yellow-600 bg-yellow-100';
      case 'Resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredConflicts = activeConflicts.filter(conflict => {
    const regionMatch = selectedRegion === 'All' || conflict.region === selectedRegion;
    const intensityMatch = intensityFilter === 'All' || conflict.intensity === intensityFilter;
    return regionMatch && intensityMatch;
  });

  const refreshData = () => {
    setLastUpdated(new Date());
    // Simulate data refresh
    console.log('Refreshing conflict data...');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-blue-400" />
              <h1 className="text-3xl font-bold">Global Conflict Monitoring System</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <button
                onClick={refreshData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm"
            >
              {regions.map(region => (
                <option key={region} value={region}>Region: {region}</option>
              ))}
            </select>
            <select
              value={intensityFilter}
              onChange={(e) => setIntensityFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm"
            >
              {intensityLevels.map(level => (
                <option key={level} value={level}>Intensity: {level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Active Conflicts</h3>
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-red-400">
              {activeConflicts.filter(c => c.status === 'Active').length}
            </div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Under Monitoring</h3>
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-400">
              {activeConflicts.filter(c => c.status === 'Monitoring').length}
            </div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">High Intensity</h3>
              <div className="h-3 w-3 bg-red-500 rounded-full" />
            </div>
            <div className="text-2xl font-bold text-red-400">
              {activeConflicts.filter(c => c.intensity === 'High').length}
            </div>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Regions Affected</h3>
              <MapPin className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {new Set(activeConflicts.map(c => c.region)).size}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conflicts List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Active Conflicts</h2>
            {filteredConflicts.map(conflict => (
              <div key={conflict.id} className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{conflict.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {conflict.region}
                      </span>
                      <span>Started: {new Date(conflict.startDate).toLocaleDateString()}</span>
                      <span>Updated: {conflict.lastUpdate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${getIntensityColor(conflict.intensity)}`} />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conflict.status)}`}>
                      {conflict.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Key Developments:</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {conflict.keyDevelopments.map((dev, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="h-1 w-1 bg-blue-400 rounded-full" />
                        {dev}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-gray-400">
                  <strong>Casualties/Impact:</strong> {conflict.casualties}
                </div>
              </div>
            ))}
          </div>

          {/* News Feed */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Latest News</h2>
            <div className="space-y-4">
              {newsHeadlines.map(news => (
                <div key={news.id} className="bg-slate-800 rounded-lg border border-slate-700 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      news.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {news.priority}
                    </span>
                    <span className="text-xs text-gray-400">{news.timestamp}</span>
                  </div>
                  
                  <h3 className="font-semibold mb-2 text-sm leading-tight">{news.title}</h3>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{news.source}</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {news.region}
                    </div>
                  </div>
                  
                  <button className="flex items-center gap-1 mt-2 text-blue-400 hover:text-blue-300 text-xs">
                    Read more <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* World Map Placeholder */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
              <h3 className="font-bold mb-4">Conflict Map</h3>
              <div className="bg-slate-700 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Interactive world map</p>
                  <p className="text-xs">Conflict locations and intensity</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-red-500 rounded-full" />
                  High Intensity
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                  Medium Intensity
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  Low Intensity
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictMonitoringSystem;