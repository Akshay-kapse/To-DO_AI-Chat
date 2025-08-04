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
    console.error('❌ Health check failed:', error.message);
    return;
  }

  // Test 2: Chat endpoint
  try {
    console.log('\n2️⃣ Testing chat endpoint...');
    const chatResponse = await axios.post(`${API_URL}/api/chat`, {
      message: 'Hello, this is a test message',
      context: 'Testing context'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Chat endpoint passed:', chatResponse.data);
  } catch (error) {
    console.error('❌ Chat endpoint failed:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
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
    console.log('✅ Task suggestions passed:', suggestionsResponse.data);
  } catch (error) {
    console.error('❌ Task suggestions failed:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
  }
}

testBackend().catch(console.error);