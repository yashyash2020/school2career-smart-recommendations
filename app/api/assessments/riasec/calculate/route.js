import { NextResponse } from 'next/server';
import RIASECInternational from '../../../../lib/algorithms/RIASECInternational.js';
import RIASECDatabaseIntegration from '../../../../lib/database/riasecIntegration.js';

export async function POST(request) {
  try {
    console.log('🚀 API Route: تلقي طلب حساب RIASEC');
    
    const body = await request.json();
    console.log('📦 البيانات الواردة:', body);
    
    const { 
      responses, 
      userId, 
      toolCode = 'RIASEC-180',
      options = {} 
    } = body;
    
    console.log('📊 الاستجابات:', responses);
    console.log('🏷️ رمز الأداة:', toolCode);
    console.log('⚙️ الخيارات:', options);

    // Validate required fields
    if (!responses) {
      return NextResponse.json(
        { error: 'Responses are required', code: 'MISSING_RESPONSES' },
        { status: 400 }
      );
    }

    // Initialize the algorithm and database integration
    const algorithm = new RIASECInternational();
    const dbIntegration = new RIASECDatabaseIntegration();

    // Set default options
    const calculationOptions = {
      country: options.country || 'international',
      version: options.version || 'full',
      lambda: options.lambda || 0.35,
      sdGate: options.sdGate || 1.0,
      ...options
    };

    // Calculate results using appropriate algorithm (international or school2career)
    console.log('🧮 حساب النتائج باستخدام toolCode:', toolCode);
    const algorithmResults = await dbIntegration.calculateResults(responses, toolCode);
    console.log('🎉 نتائج الخوارزمية من dbIntegration:', algorithmResults);

    // If userId is provided, save to database
    let savedResult = null;
    if (userId) {
      try {
        savedResult = await dbIntegration.saveAssessmentResults({
          userId,
          toolCode,
          responses,
          options: calculationOptions
        });
      } catch (dbError) {
        console.error('Database save error:', dbError);
        // Continue without saving if database fails
      }
    }

    // Return comprehensive response
    return NextResponse.json({
      success: true,
      data: {
        algorithm_results: algorithmResults,
        saved_result: savedResult,
        metadata: {
          calculation_timestamp: new Date().toISOString(),
          algorithm_version: 'RIASECInternational_v1.0',
          options_used: calculationOptions,
          question_version: toolCode
        }
      }
    });

  } catch (error) {
    console.error('RIASEC calculation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error during calculation',
        code: 'CALCULATION_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit')) || 10;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    const algorithm = new RIASECInternational();
    const dbIntegration = new RIASECDatabaseIntegration();

    // Get user's assessment history
    const history = await dbIntegration.getUserAssessmentHistory(userId, limit);

    return NextResponse.json({
      success: true,
      data: {
        history,
        count: history.length,
        user_id: userId
      }
    });

  } catch (error) {
    console.error('RIASEC history retrieval error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to retrieve assessment history',
        code: 'HISTORY_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
      },
      { status: 500 }
    );
  }
}