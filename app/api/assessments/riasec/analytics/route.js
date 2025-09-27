import { NextResponse } from 'next/server';
import RIASECInternational from '../../../../lib/algorithms/RIASECInternational.js';
import RIASECDatabaseIntegration from '../../../../lib/database/riasecIntegration.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const analysisType = searchParams.get('type') || 'comprehensive'; // comprehensive, trends, comparison
    const timeframe = searchParams.get('timeframe') || '1year'; // 1month, 3months, 6months, 1year, all
    const includeNorms = searchParams.get('includeNorms') === 'true';

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    const algorithm = new RIASECInternational();
    const dbIntegration = new RIASECDatabaseIntegration();

    // Get user's assessment history based on timeframe
    const history = await dbIntegration.getUserAssessmentHistory(userId, getTimeframeLimit(timeframe));

    if (!history || history.length === 0) {
      return NextResponse.json(
        { error: 'No assessment history found for user', code: 'NO_HISTORY' },
        { status: 404 }
      );
    }

    let analyticsData = {};

    switch (analysisType) {
      case 'trends':
        analyticsData = await generateTrendAnalysis(history, algorithm);
        break;
        
      case 'comparison':
        analyticsData = await generateComparisonAnalysis(history, algorithm, includeNorms);
        break;
        
      case 'comprehensive':
      default:
        analyticsData = await generateComprehensiveAnalysis(history, algorithm, includeNorms);
        break;
    }

    return NextResponse.json({
      success: true,
      data: {
        user_id: userId,
        analysis_type: analysisType,
        timeframe: timeframe,
        total_assessments: history.length,
        date_range: {
          earliest: history[history.length - 1]?.created_at,
          latest: history[0]?.created_at
        },
        analytics: analyticsData,
        generated_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('RIASEC analytics error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate analytics',
        code: 'ANALYTICS_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
      },
      { status: 500 }
    );
  }
}

// POST endpoint for custom analytics requests
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      userId, 
      customFilters = {},
      analysisOptions = {},
      exportFormat = 'json' 
    } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    const algorithm = new RIASECInternational();
    const dbIntegration = new RIASECDatabaseIntegration();

    // Get filtered assessment history
    const history = await dbIntegration.getUserAssessmentHistory(userId, 50, customFilters);

    if (!history || history.length === 0) {
      return NextResponse.json(
        { error: 'No matching assessments found', code: 'NO_MATCHING_DATA' },
        { status: 404 }
      );
    }

    // Generate custom analytics
    const customAnalytics = await generateCustomAnalytics(history, algorithm, analysisOptions);

    // Format response based on export format
    if (exportFormat === 'csv') {
      const csvData = convertAnalyticsToCSV(customAnalytics);
      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="riasec_analytics_${userId}_${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        user_id: userId,
        custom_filters: customFilters,
        analysis_options: analysisOptions,
        total_assessments: history.length,
        analytics: customAnalytics,
        generated_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Custom RIASEC analytics error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate custom analytics',
        code: 'CUSTOM_ANALYTICS_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
      },
      { status: 500 }
    );
  }
}

// Helper functions

function getTimeframeLimit(timeframe) {
  const limits = {
    '1month': 5,
    '3months': 10,
    '6months': 20,
    '1year': 50,
    'all': 100
  };
  return limits[timeframe] || limits['1year'];
}

async function generateTrendAnalysis(history, algorithm) {
  const trends = {
    type_progression: {},
    consistency_trends: [],
    holland_code_evolution: [],
    score_stability: {}
  };

  // Track type score changes over time
  const types = ['R', 'I', 'A', 'S', 'E', 'C'];
  for (const type of types) {
    trends.type_progression[type] = history.map(assessment => ({
      date: assessment.created_at,
      raw_score: assessment.raw_scores?.[type]?.raw || 0,
      percentage: assessment.raw_scores?.[type]?.percentage || 0,
      z_score: assessment.raw_scores?.[type]?.z || 0
    }));
  }

  // Track Holland Code changes
  trends.holland_code_evolution = history.map(assessment => ({
    date: assessment.created_at,
    holland_code: assessment.calculated_scores?.holland_code,
    consistency: assessment.calculated_scores?.indices?.consistency?.score || 0
  }));

  // Calculate score stability (variance)
  for (const type of types) {
    const scores = history.map(a => a.raw_scores?.[type]?.raw || 0);
    trends.score_stability[type] = {
      mean: scores.reduce((a, b) => a + b, 0) / scores.length,
      variance: calculateVariance(scores),
      stability_rating: calculateVariance(scores) < 10 ? 'stable' : 'variable'
    };
  }

  return trends;
}

async function generateComparisonAnalysis(history, algorithm, includeNorms) {
  const latest = history[0];
  const comparison = {
    personal_progress: {},
    norm_comparisons: {},
    percentile_rankings: {}
  };

  if (history.length > 1) {
    const previous = history[1];
    
    // Personal progress comparison
    for (const type of ['R', 'I', 'A', 'S', 'E', 'C']) {
      const currentScore = latest.raw_scores?.[type]?.raw || 0;
      const previousScore = previous.raw_scores?.[type]?.raw || 0;
      
      comparison.personal_progress[type] = {
        current: currentScore,
        previous: previousScore,
        change: currentScore - previousScore,
        percentage_change: previousScore > 0 ? ((currentScore - previousScore) / previousScore) * 100 : 0
      };
    }
  }

  // Norm comparisons if requested
  if (includeNorms && latest.options?.country) {
    const norms = algorithm.norms[latest.options.country] || algorithm.norms.international;
    
    for (const type of ['R', 'I', 'A', 'S', 'E', 'C']) {
      const userScore = latest.raw_scores?.[type]?.raw || 0;
      const normMean = norms[type].mean;
      const normSD = norms[type].sd;
      
      comparison.norm_comparisons[type] = {
        user_score: userScore,
        norm_mean: normMean,
        norm_sd: normSD,
        z_score: (userScore - normMean) / normSD,
        percentile: latest.raw_scores?.[type]?.percentile || 0,
        interpretation: userScore > normMean + normSD ? 'above_average' : 
                       userScore < normMean - normSD ? 'below_average' : 'average'
      };
    }
  }

  return comparison;
}

async function generateComprehensiveAnalysis(history, algorithm, includeNorms) {
  const trends = await generateTrendAnalysis(history, algorithm);
  const comparison = await generateComparisonAnalysis(history, algorithm, includeNorms);
  
  const comprehensive = {
    summary: {
      total_assessments: history.length,
      assessment_span_days: calculateDateSpan(history),
      most_consistent_type: findMostConsistentType(trends),
      dominant_holland_pattern: findDominantPattern(history)
    },
    trends,
    comparison,
    insights: generateInsights(history, trends, comparison)
  };

  return comprehensive;
}

async function generateCustomAnalytics(history, algorithm, options) {
  const analytics = {};

  if (options.includeSubdomains) {
    analytics.subdomain_analysis = analyzeSubdomains(history);
  }

  if (options.includeConsistency) {
    analytics.consistency_analysis = analyzeConsistency(history);
  }

  if (options.includeCareerMapping) {
    analytics.career_mapping = generateCareerMapping(history);
  }

  return analytics;
}

// Utility functions
function calculateVariance(scores) {
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  return Math.round(variance * 100) / 100;
}

function calculateDateSpan(history) {
  if (history.length < 2) return 0;
  const earliest = new Date(history[history.length - 1].created_at);
  const latest = new Date(history[0].created_at);
  return Math.round((latest - earliest) / (1000 * 60 * 60 * 24));
}

function findMostConsistentType(trends) {
  let mostConsistent = null;
  let lowestVariance = Infinity;
  
  for (const [type, data] of Object.entries(trends.score_stability)) {
    if (data.variance < lowestVariance) {
      lowestVariance = data.variance;
      mostConsistent = type;
    }
  }
  
  return mostConsistent;
}

function findDominantPattern(history) {
  const hollandCodes = history.map(h => h.calculated_scores?.holland_code).filter(Boolean);
  const frequency = {};
  
  hollandCodes.forEach(code => {
    frequency[code] = (frequency[code] || 0) + 1;
  });
  
  return Object.entries(frequency).sort(([,a], [,b]) => b - a)[0]?.[0] || null;
}

function generateInsights(history, trends, comparison) {
  const insights = [];

  // Add specific insights based on data analysis
  if (trends.score_stability) {
    const stableTypes = Object.entries(trends.score_stability)
      .filter(([, data]) => data.stability_rating === 'stable')
      .map(([type]) => type);
    
    if (stableTypes.length >= 3) {
      insights.push({
        type: 'stability',
        message: `Your interests show high stability in ${stableTypes.length} areas, indicating consistent career preferences.`,
        types_involved: stableTypes
      });
    }
  }

  return insights;
}

function analyzeSubdomains(history) {
  // Analyze subdomain patterns across assessments
  return { message: 'Subdomain analysis not yet implemented' };
}

function analyzeConsistency(history) {
  // Analyze consistency patterns
  return { message: 'Consistency analysis not yet implemented' };
}

function generateCareerMapping(history) {
  // Generate career mapping insights
  return { message: 'Career mapping not yet implemented' };
}

function convertAnalyticsToCSV(analytics) {
  // Convert analytics object to CSV format
  let csv = 'Type,Value,Date\n';
  // Implementation would depend on specific analytics structure
  return csv;
}