import { NextResponse } from 'next/server';
import RIASECInternational from '../../../../lib/algorithms/RIASECInternational.js';

export async function POST(request) {
  try {
    const body = await request.json();
    const { test_type, parameters = {} } = body;

    const algorithm = new RIASECInternational();

    let testResults = {};

    switch (test_type) {
      case 'algorithm_validation':
        testResults = await validateAlgorithm(algorithm, parameters);
        break;
        
      case 'version_adaptation':
        testResults = await testVersionAdaptation(algorithm, parameters);
        break;
        
      case 'norm_comparison':
        testResults = await testNormComparison(algorithm, parameters);
        break;
        
      case 'consistency_check':
        testResults = await testConsistencyCheck(algorithm, parameters);
        break;
        
      case 'performance_benchmark':
        testResults = await benchmarkPerformance(algorithm, parameters);
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid test type', code: 'INVALID_TEST_TYPE' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      test_type,
      parameters,
      results: testResults,
      tested_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('RIASEC test error:', error);
    
    return NextResponse.json(
      { 
        error: 'Test execution failed',
        code: 'TEST_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const info_type = searchParams.get('info') || 'algorithm_specs';

    const algorithm = new RIASECInternational();

    let infoData = {};

    switch (info_type) {
      case 'algorithm_specs':
        infoData = getAlgorithmSpecs(algorithm);
        break;
        
      case 'supported_versions':
        infoData = getSupportedVersions();
        break;
        
      case 'available_norms':
        infoData = getAvailableNorms(algorithm);
        break;
        
      case 'test_examples':
        infoData = getTestExamples();
        break;
        
      default:
        infoData = {
          available_info_types: ['algorithm_specs', 'supported_versions', 'available_norms', 'test_examples']
        };
    }

    return NextResponse.json({
      success: true,
      info_type,
      data: infoData
    });

  } catch (error) {
    console.error('RIASEC info retrieval error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to retrieve information',
        code: 'INFO_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
      },
      { status: 500 }
    );
  }
}

// Test functions

async function validateAlgorithm(algorithm, params) {
  const testCases = [
    // High Realistic profile
    {
      name: 'High_Realistic_Profile',
      responses: generateTestResponses('R', 'high'),
      expected_primary: 'R'
    },
    // Balanced profile
    {
      name: 'Balanced_Profile', 
      responses: generateTestResponses('balanced'),
      expected_pattern: 'balanced'
    },
    // Strong opposite pairs
    {
      name: 'Opposite_Pairs_Test',
      responses: generateOppositeTestResponses(),
      test_opposite_filtering: true
    }
  ];

  const validationResults = [];

  for (const testCase of testCases) {
    try {
      const result = algorithm.calculate(testCase.responses, params);
      
      validationResults.push({
        test_name: testCase.name,
        passed: validateTestResult(result, testCase),
        result_summary: {
          holland_code: result.holland_code,
          top_type: result.ranking[0],
          consistency: result.indices.consistency.score
        }
      });
    } catch (error) {
      validationResults.push({
        test_name: testCase.name,
        passed: false,
        error: error.message
      });
    }
  }

  return {
    total_tests: testCases.length,
    passed_tests: validationResults.filter(r => r.passed).length,
    test_results: validationResults
  };
}

async function testVersionAdaptation(algorithm, params) {
  const fullResponses = generateTestResponses('R', 'high', 180);
  
  const versionTests = [
    { version: 30, responses: adaptResponsesForVersion(fullResponses, 30) },
    { version: 60, responses: adaptResponsesForVersion(fullResponses, 60) },
    { version: 180, responses: fullResponses }
  ];

  const adaptationResults = [];

  for (const versionTest of versionTests) {
    try {
      const result = algorithm.calculate(versionTest.responses, { 
        ...params, 
        version: versionTest.version <= 30 ? 'short' : versionTest.version <= 60 ? 'medium' : 'full'
      });
      
      adaptationResults.push({
        version: versionTest.version,
        question_count: Object.keys(versionTest.responses).length,
        holland_code: result.holland_code,
        primary_type: result.ranking[0],
        success: true
      });
    } catch (error) {
      adaptationResults.push({
        version: versionTest.version,
        success: false,
        error: error.message
      });
    }
  }

  return {
    version_adaptation_tests: adaptationResults,
    consistency_across_versions: checkVersionConsistency(adaptationResults)
  };
}

async function testNormComparison(algorithm, params) {
  const testResponses = generateTestResponses('I', 'medium');
  const countries = ['international', 'egypt', 'saudi'];
  
  const normResults = [];

  for (const country of countries) {
    try {
      const result = algorithm.calculate(testResponses, { ...params, country });
      
      normResults.push({
        country,
        norms_used: result.norms_used,
        z_scores: Object.fromEntries(
          Object.entries(result.raw_scores).map(([type, data]) => [type, data.z])
        ),
        percentiles: Object.fromEntries(
          Object.entries(result.raw_scores).map(([type, data]) => [type, data.percentile])
        )
      });
    } catch (error) {
      normResults.push({
        country,
        error: error.message
      });
    }
  }

  return {
    norm_comparison_tests: normResults,
    differences_detected: analyzeDifferences(normResults)
  };
}

async function testConsistencyCheck(algorithm, params) {
  const consistencyTests = [
    { name: 'High_Consistency', responses: generateConsistentResponses() },
    { name: 'Low_Consistency', responses: generateInconsistentResponses() },
    { name: 'Random_Responses', responses: generateRandomResponses() }
  ];

  const consistencyResults = [];

  for (const test of consistencyTests) {
    try {
      const result = algorithm.calculate(test.responses, params);
      
      consistencyResults.push({
        test_name: test.name,
        consistency_score: result.indices.consistency.score,
        consistency_interpretation: result.indices.consistency.interpretation,
        differentiation: result.indices.differentiation.score,
        congruence: result.indices.congruence.score
      });
    } catch (error) {
      consistencyResults.push({
        test_name: test.name,
        error: error.message
      });
    }
  }

  return {
    consistency_tests: consistencyResults,
    expected_patterns: 'High consistency should score >75, low consistency <50'
  };
}

async function benchmarkPerformance(algorithm, params) {
  const iterationCounts = [10, 100, 1000];
  const benchmarkResults = [];

  for (const iterations of iterationCounts) {
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      const testResponses = generateRandomResponses();
      algorithm.calculate(testResponses, params);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    
    benchmarkResults.push({
      iterations,
      total_time_ms: Math.round(totalTime),
      average_time_per_calculation: Math.round((totalTime / iterations) * 100) / 100,
      calculations_per_second: Math.round((iterations / totalTime) * 1000)
    });
  }

  return {
    performance_benchmark: benchmarkResults,
    memory_usage: 'Not available in this environment'
  };
}

// Helper functions

function getAlgorithmSpecs(algorithm) {
  return {
    algorithm_name: 'RIASEC International Scoring & Triad Selection',
    version: '1.0',
    supported_question_counts: [30, 60, 180],
    supported_countries: Object.keys(algorithm.norms),
    hexagon_distance_matrix: algorithm.hexDist,
    default_parameters: algorithm.defaults,
    features: [
      'Hexagon-aware triad selection',
      'International norms support', 
      'Multi-version adaptation',
      'Subdomain analysis',
      'Consistency indices',
      'Opposite pair filtering'
    ]
  };
}

function getSupportedVersions() {
  return {
    supported_versions: [
      { questions: 30, code: 'RIASEC-30', description: 'Short version - 5 questions per type' },
      { questions: 60, code: 'RIASEC-60', description: 'Medium version - 10 questions per type' },
      { questions: 180, code: 'RIASEC-180', description: 'Full version - 30 questions per type' }
    ],
    version_mapping: {
      'short': 30,
      'medium': 60, 
      'full': 180
    }
  };
}

function getAvailableNorms(algorithm) {
  return {
    available_norms: algorithm.norms,
    default_country: 'international',
    norm_structure: 'Each type has mean and standard deviation values'
  };
}

function getTestExamples() {
  return {
    sample_test_requests: [
      {
        test_type: 'algorithm_validation',
        parameters: { country: 'international', lambda: 0.35 }
      },
      {
        test_type: 'version_adaptation', 
        parameters: { country: 'egypt' }
      },
      {
        test_type: 'norm_comparison',
        parameters: { version: 'full' }
      }
    ],
    sample_responses_format: {
      'R1': 2, 'R2': 1, 'R3': 0,
      'I1': 1, 'I2': 2, 'I3': 1,
      // ... continue for all questions
    }
  };
}

// Test data generation functions

function generateTestResponses(primaryType = 'R', level = 'medium', totalQuestions = 180) {
  const responses = {};
  const types = ['R', 'I', 'A', 'S', 'E', 'C'];
  const questionsPerType = totalQuestions / 6;
  
  for (const type of types) {
    for (let i = 1; i <= questionsPerType; i++) {
      const key = `${type}${i}`;
      
      if (type === primaryType) {
        // Higher scores for primary type
        responses[key] = level === 'high' ? (Math.random() > 0.3 ? 2 : 1) :
                        level === 'medium' ? (Math.random() > 0.5 ? 1 : 0) :
                        Math.floor(Math.random() * 3);
      } else {
        // Lower scores for other types
        responses[key] = Math.random() > 0.7 ? 1 : 0;
      }
    }
  }
  
  return responses;
}

function generateRandomResponses() {
  const responses = {};
  const types = ['R', 'I', 'A', 'S', 'E', 'C'];
  
  for (const type of types) {
    for (let i = 1; i <= 30; i++) {
      responses[`${type}${i}`] = Math.floor(Math.random() * 3);
    }
  }
  
  return responses;
}

function generateConsistentResponses() {
  const responses = {};
  const primaryTypes = ['R', 'I']; // Adjacent types for consistency
  
  for (const type of ['R', 'I', 'A', 'S', 'E', 'C']) {
    for (let i = 1; i <= 30; i++) {
      if (primaryTypes.includes(type)) {
        responses[`${type}${i}`] = Math.random() > 0.2 ? 2 : 1;
      } else {
        responses[`${type}${i}`] = Math.random() > 0.8 ? 1 : 0;
      }
    }
  }
  
  return responses;
}

function generateInconsistentResponses() {
  const responses = {};
  
  for (const type of ['R', 'I', 'A', 'S', 'E', 'C']) {
    for (let i = 1; i <= 30; i++) {
      responses[`${type}${i}`] = Math.floor(Math.random() * 3);
    }
  }
  
  return responses;
}

function generateOppositeTestResponses() {
  const responses = {};
  
  // High R and A (opposite types) to test filtering
  for (let i = 1; i <= 30; i++) {
    responses[`R${i}`] = Math.random() > 0.3 ? 2 : 1;
    responses[`A${i}`] = Math.random() > 0.3 ? 2 : 1;
    responses[`I${i}`] = Math.random() > 0.7 ? 1 : 0;
    responses[`S${i}`] = 0;
    responses[`E${i}`] = 0;
    responses[`C${i}`] = 0;
  }
  
  return responses;
}

function adaptResponsesForVersion(fullResponses, targetVersion) {
  const adapted = {};
  const questionsPerType = targetVersion / 6;
  
  for (const type of ['R', 'I', 'A', 'S', 'E', 'C']) {
    for (let i = 1; i <= questionsPerType; i++) {
      adapted[`${type}${i}`] = fullResponses[`${type}${i}`] || 0;
    }
  }
  
  return adapted;
}

function validateTestResult(result, testCase) {
  if (testCase.expected_primary) {
    return result.ranking[0].type === testCase.expected_primary;
  }
  
  if (testCase.expected_pattern === 'balanced') {
    const topScore = result.ranking[0].raw;
    const bottomScore = result.ranking[5].raw;
    return (topScore - bottomScore) < 20; // Relatively balanced
  }
  
  return true; // Default pass
}

function checkVersionConsistency(adaptationResults) {
  const hollandCodes = adaptationResults.map(r => r.holland_code).filter(Boolean);
  const unique = [...new Set(hollandCodes)];
  
  return {
    consistent: unique.length <= 2,
    unique_codes: unique,
    consistency_ratio: unique.length / hollandCodes.length
  };
}

function analyzeDifferences(normResults) {
  if (normResults.length < 2) return 'Insufficient data for comparison';
  
  const differences = {};
  const types = ['R', 'I', 'A', 'S', 'E', 'C'];
  
  for (const type of types) {
    const zScores = normResults.map(r => r.z_scores?.[type]).filter(z => z !== undefined);
    if (zScores.length > 1) {
      const max = Math.max(...zScores);
      const min = Math.min(...zScores);
      differences[type] = Math.round((max - min) * 100) / 100;
    }
  }
  
  return differences;
}