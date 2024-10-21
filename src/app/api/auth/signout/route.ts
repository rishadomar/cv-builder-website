'use client';
// app/api/auth/signout/route.ts

import { NextRequest, NextResponse } from 'next/server';
//import { cookies } from 'next/headers';

const { COGNITO_DOMAIN, COGNITO_APP_CLIENT_ID, COGNITO_APP_CLIENT_SECRET } = process.env;

export async function GET(request: NextRequest) {
    // const cookieStore = cookies();

    // const idTokenExists = cookieStore.has('id_token');
    // const accessTokenExists = cookieStore.has('access_token');
    // const refreshTokenExists = cookieStore.has('refresh_token');

    // if (!refreshTokenExists) {
    //     return NextResponse.redirect(new URL('/authentication', request.nextUrl));
    // }

    // const token =
    //     cookieStore.get('refresh_token') ??
    //     'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.vuM63ucRaI_4vnI6VOeybfvm4gX2VecgQAVv4BliRmyDRsFuOWyB8aDOoC3R3x0EtPWszoDf-sSpvtMzc2OnyOLVmZPLemJnr1L5d4BVsn-YwnkurBEYEweco3uZzY064_HLNTJpZtilO7hVGyFI4Mxr5vz1qm9DCEUN2x4qmpeYRgzlHU7qkapn2FRxtk466cmn8bnZDsirah-pU-8CilxRxNRfYQEcS0FzYNDuU9XfNCPeX1z15Djx5YfLXDOCh836-evsPBvRPYre1q41Q8SbpzD7n2LChU9PrVEkJswEWjZQHqiYnWYlOhEiosKk7yVEfpZ_1CF5sjFWIXeb4w.YKdfvRboou7GGHzz.8xMo18C1y_bDS-lXZymXfB4UQUh_-kU9-dcQXhodZNbiOy4ftx48KuS6fttiDNrfiqvHSq1BDfryWWZ4OU8nJxhPHicImy7na-7g8XaKBJeDfZKAo6mMD98bpRmDAB5NEuGZa_bsyZcc_GRdCS2CDjfagnumFI3gODuirQt8e2CmCCqGiUoFrczlPKg_HDZZWdjtiS_arnSCA41OweGo9lG32ONsCsd3fUSplJm-KSasYhtZ-HshW8A59Mr5D0ct9XLYzf5fpCZDvpVVoF1XtwMv7qN1Xc_UFrmVSumCt4xWdc9qHtwMlfAZV7bRXVWvNVdVpPTU-ugpZ1yqGzGN1dkGluowYeUiC2PhjtdDjlvHAGpIzarH5NpFunU1NSeHHoMlPqUmG48qX53_fZE0IPpws51xEZ6BMzsFyv8Myi5mxtod4T1VSdZ9nIsRYZH5kBhgXXQ0J1IyzYC63iJqzT4OieMBkB_UqkTOUh3Exu2iYQMX-JoHxzYHX1zF_i6FBE3JL1AvkEmk2WQOMN88rNtRryA_KZKJna1mNTYyNSn9FUbh5HHX_52_zgNiCaA-kSPC6YEKPeJW6k95Lwvm0rO_UZVXrPMbEoUFqKe0yQ2_k0ZGa0pgkKy2oVeY_bQiqhZedVvKG8qPRVUAS5405szem8RFM3J5MZs2HeJA0vclMBLtbhsEcLRry-cqWkNe4nx_f1mcHQTPbdPJw4ctbJrGsWJYR2R_S0_M6XaHpQBRTdX_nvTvU8S5q0dDD-sk6_XPjZMD--MlIo5FiwvivMFoJ7erT7SXnzaH3Fn3Z5Pbhere7F3ozmn8f7tGufn69tIGBij9HhbXEYErV8-7qSZoaAywsKQF7rKpJw-xOehkikvtcR7Y-R3FrE4i00iiOUIcdx8Vg2obqvA8Df8WB_DNBTw0FhDiuxxDZ47pjMewig7TKMXbHGEIVe3-dQT-GLvyHXPT1XbrEDdxWY_mGuinKDnk-EKKma4r7hIBKEo8kcsJ74RJXFTLqYYZxlacZhjfqUrZGMjHnZPffnTJS_2RnQHNO7SCEDJPjOvrf_w9aBMSHyDRpEXSgd4pUnunzSR7ficsVz7omGODuQnaWR-2SlYElE6YndzPMSeC97yOi7vc3zedWU3P0w6HjKXtJta7_7POWx5WC0JWd9JcSZogzZjSxty73qfyc9uFLqyKXogbR30Wp8tatwp1M_P0OMFVG9Y0v_wX0lfc4dsB4CQLLkbF.BhuVEogFyAnH2MBomQ-O-A';
    const token =
        'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.vuM63ucRaI_4vnI6VOeybfvm4gX2VecgQAVv4BliRmyDRsFuOWyB8aDOoC3R3x0EtPWszoDf-sSpvtMzc2OnyOLVmZPLemJnr1L5d4BVsn-YwnkurBEYEweco3uZzY064_HLNTJpZtilO7hVGyFI4Mxr5vz1qm9DCEUN2x4qmpeYRgzlHU7qkapn2FRxtk466cmn8bnZDsirah-pU-8CilxRxNRfYQEcS0FzYNDuU9XfNCPeX1z15Djx5YfLXDOCh836-evsPBvRPYre1q41Q8SbpzD7n2LChU9PrVEkJswEWjZQHqiYnWYlOhEiosKk7yVEfpZ_1CF5sjFWIXeb4w.YKdfvRboou7GGHzz.8xMo18C1y_bDS-lXZymXfB4UQUh_-kU9-dcQXhodZNbiOy4ftx48KuS6fttiDNrfiqvHSq1BDfryWWZ4OU8nJxhPHicImy7na-7g8XaKBJeDfZKAo6mMD98bpRmDAB5NEuGZa_bsyZcc_GRdCS2CDjfagnumFI3gODuirQt8e2CmCCqGiUoFrczlPKg_HDZZWdjtiS_arnSCA41OweGo9lG32ONsCsd3fUSplJm-KSasYhtZ-HshW8A59Mr5D0ct9XLYzf5fpCZDvpVVoF1XtwMv7qN1Xc_UFrmVSumCt4xWdc9qHtwMlfAZV7bRXVWvNVdVpPTU-ugpZ1yqGzGN1dkGluowYeUiC2PhjtdDjlvHAGpIzarH5NpFunU1NSeHHoMlPqUmG48qX53_fZE0IPpws51xEZ6BMzsFyv8Myi5mxtod4T1VSdZ9nIsRYZH5kBhgXXQ0J1IyzYC63iJqzT4OieMBkB_UqkTOUh3Exu2iYQMX-JoHxzYHX1zF_i6FBE3JL1AvkEmk2WQOMN88rNtRryA_KZKJna1mNTYyNSn9FUbh5HHX_52_zgNiCaA-kSPC6YEKPeJW6k95Lwvm0rO_UZVXrPMbEoUFqKe0yQ2_k0ZGa0pgkKy2oVeY_bQiqhZedVvKG8qPRVUAS5405szem8RFM3J5MZs2HeJA0vclMBLtbhsEcLRry-cqWkNe4nx_f1mcHQTPbdPJw4ctbJrGsWJYR2R_S0_M6XaHpQBRTdX_nvTvU8S5q0dDD-sk6_XPjZMD--MlIo5FiwvivMFoJ7erT7SXnzaH3Fn3Z5Pbhere7F3ozmn8f7tGufn69tIGBij9HhbXEYErV8-7qSZoaAywsKQF7rKpJw-xOehkikvtcR7Y-R3FrE4i00iiOUIcdx8Vg2obqvA8Df8WB_DNBTw0FhDiuxxDZ47pjMewig7TKMXbHGEIVe3-dQT-GLvyHXPT1XbrEDdxWY_mGuinKDnk-EKKma4r7hIBKEo8kcsJ74RJXFTLqYYZxlacZhjfqUrZGMjHnZPffnTJS_2RnQHNO7SCEDJPjOvrf_w9aBMSHyDRpEXSgd4pUnunzSR7ficsVz7omGODuQnaWR-2SlYElE6YndzPMSeC97yOi7vc3zedWU3P0w6HjKXtJta7_7POWx5WC0JWd9JcSZogzZjSxty73qfyc9uFLqyKXogbR30Wp8tatwp1M_P0OMFVG9Y0v_wX0lfc4dsB4CQLLkbF.BhuVEogFyAnH2MBomQ-O-A';
    const authorizationHeader = `Basic ${Buffer.from(`${COGNITO_APP_CLIENT_ID}:${COGNITO_APP_CLIENT_SECRET}`).toString(
        'base64'
    )}`;

    const response = await fetch(`${COGNITO_DOMAIN}/oauth2/revoke`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: authorizationHeader
        },
        body: new URLSearchParams({
            //token: token?.value!
            token
        })
    });

    console.log('<<<<Signout after POST', response);

    if (!response.ok) {
        const data = await response.json();

        return NextResponse.json({
            error: data.error,
            error_description: data.error_description
        });
    }

    // if (response.ok) {
    //     if (idTokenExists) {
    //         cookieStore.delete('id_token');
    //     }

    //     if (accessTokenExists) {
    //         cookieStore.delete('access_token');
    //     }

    //     if (refreshTokenExists) {
    //         cookieStore.delete('refresh_token');
    //     }

    //     return NextResponse.redirect(new URL('/login', request.nextUrl));
    // }
    return NextResponse.redirect(new URL('/authentication', request.nextUrl));
}
