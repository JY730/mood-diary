import { NextRequest, NextResponse } from 'next/server';

/**
 * GraphQL API 프록시
 * 
 * 클라이언트에서 직접 외부 GraphQL API를 호출하면 CORS 문제가 발생할 수 있으므로,
 * Next.js API Route를 통해 서버 사이드에서 프록시합니다.
 */

const GRAPHQL_API_URL = 'https://main-practice.codebootcamp.co.kr/graphql';

export async function POST(request: NextRequest) {
  try {
    // 클라이언트에서 받은 요청 본문과 헤더 가져오기
    const body = await request.json();
    const authorization = request.headers.get('authorization');

    // 외부 GraphQL API 호출
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Authorization 헤더가 있으면 포함
    if (authorization) {
      headers['Authorization'] = authorization;
    }

    const response = await fetch(GRAPHQL_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // 응답 반환 (CORS 헤더 추가)
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('GraphQL API 프록시 오류:', error);
    return NextResponse.json(
      { errors: [{ message: 'API 요청 중 오류가 발생했습니다.' }] },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}

/**
 * OPTIONS 메서드 핸들러
 * 브라우저의 preflight 요청을 처리합니다.
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

