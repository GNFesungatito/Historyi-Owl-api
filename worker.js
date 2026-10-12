try {
      const { code } = await request.json();
      if (!code) {
        return new Response(JSON.stringify({ success: false, message: '缺少激活码' }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      const SUPABASE_URL = 'https://qelbvyidikuthywsmpie.supabase.co';
      const SUPABASE_KEY = 'sb_publishable_YRbe-HaFKowNotJgp1SNtg_cREyJpET';
      const checkRes = await fetch(SUPABASE_URL + '/rest/v1/vip_codes?code=eq.' + code + '&select=*', {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY
        }
      });
  export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ success: false, message: '只支持 POST' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
    try {
      const { code } = await request.json();
      if (!code) {
        return new Response(JSON.stringify({ success: false, message: '缺少激活码' }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      const SUPABASE_URL = 'https://qelbvyidikuthywsmpie.supabase.co';
      const SUPABASE_KEY = 'sb_publishable_YRbe-HaFKowNotJgp1SNtg_cREyJpET';
      const checkRes = await fetch(SUPABASE_URL + '/rest/v1/vip_codes?code=eq.' + code + '&select=*', {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY
        }
      });
      const rows = await checkRes.json();
      if (!rows || rows.length === 0) {
        return new Response(JSON.stringify({ success: false, message: '激活码不存在' }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      const record = rows[0];
      if (record.is_used) {
        return new Response(JSON.stringify({ success: false, message: '该激活码已被使用' }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      const updateRes = await fetch(SUPABASE_URL + '/rest/v1/vip_codes?id=eq.' + record.id, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ is_used: true })
      });
      if (!updateRes.ok) {
        return new Response(JSON.stringify({ success: false, message: '服务器更新失败' }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      return new Response(JSON.stringify({
        success: true,
        message: '解锁成功',
        expireDays: 7
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: '服务器内部错误' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }
};
