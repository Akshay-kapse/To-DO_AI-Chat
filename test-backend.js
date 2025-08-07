// Quick backend test script
import axios from 'axios';

const API_URL = 'http://localhost:3001';

async function testBackend() {
  console.log('🧪 Testing backend endpoints...\n');

  // Test 1: Health check
  try {
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data);
  } catch (error) {
    console.error('❌ Health check failed:', {
      message: error.message,
      code: error.code,
      status: error.response?.status
    });
    console.error('💡 Make sure the backend server is running with: cd server && npm run dev');
    return;
  }

  // Test 2: Chat endpoint
  try {
    console.log('\n2️⃣ Testing chat endpoint...');
    const chatResponse = await axios.post(`${API_URL}/api/chat`, {
      message: 'Hello, can you help me with productivity tips?',
      context: 'Total tasks: 3, Completed: 1, Pending: 2, High priority: 1'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Chat endpoint passed:', {
      success: chatResponse.data.success,
      messageLength: chatResponse.data.data?.message?.length || 0,
      hasUsage: !!chatResponse.data.usage
    });
    console.log('📝 AI Response:', chatResponse.data.data?.message?.substring(0, 100) + '...');
  } catch (error) {
    console.error('❌ Chat endpoint failed:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      console.error('🔑 This looks like an OpenAI API key issue!');
      console.error('📝 Please check server/.env.local has: OPENAI_API_KEY=sk-...');
    }
  }

  // Test 3: Task suggestions endpoint
  try {
    console.log('\n3️⃣ Testing task suggestions endpoint...');
    const suggestionsResponse = await axios.post(`${API_URL}/api/chat/suggestions`, {
      tasks: ['Complete project', 'Review code']
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Task suggestions passed:', {
      success: suggestionsResponse.data.success,
      suggestionsCount: suggestionsResponse.data.data?.suggestions?.length || 0
    });
  } catch (error) {
    console.error('❌ Task suggestions failed:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
  }
  
  console.log('\n🎯 Test Summary:');
  console.log('If chat endpoint failed with 401, check your OpenAI API key');
  console.log('If health check failed, make sure backend is running');
  console.log('If ECONNREFUSED, backend server is not running on port 3001');
}

testBackend().catch(console.error);