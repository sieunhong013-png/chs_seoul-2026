"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Hospital = {
  name: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  verbalEducation: string[];
  serviceType?: "medication" | "verbalRehab" | "exercise";
  isCurrentlyAvailable: boolean;
  openTime: string;
  closeTime: string;
  educationPrograms?: string[];
};

const PARTNER_LOGOS = [
  "질병관리청",
  "서울특별시",
  "인제대학교",
  "서울대학교",
  "경희대학교",
];

const HOSPITALS: Hospital[] = [
  {
    name: "강남구 서울강남내과의원",
    address: "서울특별시 강남구 테헤란로 212",
    detailAddress: "서울특별시 강남구 테헤란로 212, 3층",
    phoneNumber: "02-501-1001",
    verbalEducation: ["맞춤형 운동 처방", "저염식 가이드"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:30",
    educationPrograms: ["식단상담", "운동상담"],
  },
  {
    name: "강동구 바른내과의원",
    address: "서울특별시 강동구 천호대로 1095",
    detailAddress: "서울특별시 강동구 천호대로 1095, 4층",
    phoneNumber: "02-482-1002",
    verbalEducation: ["혈압 일지 작성 교육", "생활습관 코칭"],
    isCurrentlyAvailable: true,
    openTime: "08:30",
    closeTime: "17:30",
    educationPrograms: ["복약상담", "생활습관 코칭"],
  },
  {
    name: "강북구 미아내과의원",
    address: "서울특별시 강북구 도봉로 346",
    detailAddress: "서울특별시 강북구 도봉로 346, 2층",
    phoneNumber: "02-989-1003",
    verbalEducation: ["맞춤형 운동 처방", "가정혈압 측정법"],
    isCurrentlyAvailable: true,
    openTime: "09:30",
    closeTime: "18:00",
    educationPrograms: ["식이교육", "운동상담"],
  },
  {
    name: "강서구 공항내과의원",
    address: "서울특별시 강서구 공항대로 247",
    detailAddress: "서울특별시 강서구 공항대로 247, 5층",
    phoneNumber: "02-2662-1004",
    verbalEducation: ["저염식 가이드", "복약 순응도 교육"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "17:00",
    educationPrograms: ["복약상담", "혈압기 사용법"],
  },
  {
    name: "관악구 서울관악내과",
    address: "서울특별시 관악구 남부순환로 1820",
    detailAddress: "서울특별시 관악구 남부순환로 1820, 3층",
    phoneNumber: "02-877-1005",
    verbalEducation: ["맞춤형 운동 처방", "저염식 가이드"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:00",
    educationPrograms: ["식단상담", "생활습관 코칭"],
  },
  {
    name: "광진구 자양내과의원",
    address: "서울특별시 광진구 아차산로 355",
    detailAddress: "서울특별시 광진구 아차산로 355, 4층",
    phoneNumber: "02-446-1006",
    verbalEducation: ["혈압 일지 작성 교육", "가정혈압 측정법"],
    isCurrentlyAvailable: true,
    openTime: "08:30",
    closeTime: "17:30",
    educationPrograms: ["운동상담", "복약상담"],
  },
  {
    name: "구로구 신도림내과",
    address: "서울특별시 구로구 경인로 661",
    detailAddress: "서울특별시 구로구 경인로 661, 6층",
    phoneNumber: "02-2632-1007",
    verbalEducation: ["저염식 가이드", "체중관리 교육"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:30",
    educationPrograms: ["식이교육", "운동상담"],
  },
  {
    name: "금천구 시흥내과의원",
    address: "서울특별시 금천구 시흥대로 403",
    detailAddress: "서울특별시 금천구 시흥대로 403, 2층",
    phoneNumber: "02-896-1008",
    verbalEducation: ["맞춤형 운동 처방", "생활습관 코칭"],
    isCurrentlyAvailable: true,
    openTime: "09:30",
    closeTime: "18:00",
    educationPrograms: ["운동상담", "생활습관 코칭"],
  },
  {
    name: "노원구 상계내과센터",
    address: "서울특별시 노원구 동일로 1405",
    detailAddress: "서울특별시 노원구 동일로 1405, 5층",
    phoneNumber: "02-938-1009",
    verbalEducation: ["저염식 가이드", "복약 순응도 교육"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "17:30",
    educationPrograms: ["복약상담", "혈압기 사용법"],
  },
  {
    name: "도봉구 창동내과의원",
    address: "서울특별시 도봉구 마들로 657",
    detailAddress: "서울특별시 도봉구 마들로 657, 3층",
    phoneNumber: "02-993-1010",
    verbalEducation: ["맞춤형 운동 처방", "저염식 가이드"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:00",
    educationPrograms: ["식단상담", "운동상담"],
  },
  {
    name: "동대문구 청량리내과",
    address: "서울특별시 동대문구 왕산로 214",
    detailAddress: "서울특별시 동대문구 왕산로 214, 7층",
    phoneNumber: "02-962-1011",
    verbalEducation: ["혈압 일지 작성 교육", "가정혈압 측정법"],
    isCurrentlyAvailable: true,
    openTime: "08:30",
    closeTime: "17:30",
    educationPrograms: ["복약상담", "생활습관 코칭"],
  },
  {
    name: "동작구 사당내과의원",
    address: "서울특별시 동작구 동작대로 89",
    detailAddress: "서울특별시 동작구 동작대로 89, 4층",
    phoneNumber: "02-595-1012",
    verbalEducation: ["저염식 가이드", "체중관리 교육"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:00",
    educationPrograms: ["식이교육", "운동상담"],
  },
  {
    name: "마포구 합정내과센터",
    address: "서울특별시 마포구 양화로 45",
    detailAddress: "서울특별시 마포구 양화로 45, 5층",
    phoneNumber: "02-334-1013",
    verbalEducation: ["맞춤형 운동 처방", "저염식 가이드"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:30",
    educationPrograms: ["식단상담", "운동상담"],
  },
  {
    name: "서대문구 신촌내과의원",
    address: "서울특별시 서대문구 신촌로 109",
    detailAddress: "서울특별시 서대문구 신촌로 109, 2층",
    phoneNumber: "02-312-1014",
    verbalEducation: ["생활습관 코칭", "가정혈압 측정법"],
    isCurrentlyAvailable: true,
    openTime: "09:30",
    closeTime: "18:00",
    educationPrograms: ["복약상담", "생활습관 코칭"],
  },
  {
    name: "서초구 교대내과센터",
    address: "서울특별시 서초구 서초대로 301",
    detailAddress: "서울특별시 서초구 서초대로 301, 6층",
    phoneNumber: "02-585-1015",
    verbalEducation: ["저염식 가이드", "복약 순응도 교육"],
    isCurrentlyAvailable: true,
    openTime: "08:30",
    closeTime: "17:30",
    educationPrograms: ["식이교육", "복약상담"],
  },
  {
    name: "성동구 왕십리내과의원",
    address: "서울특별시 성동구 왕십리로 315",
    detailAddress: "서울특별시 성동구 왕십리로 315, 3층",
    phoneNumber: "02-2292-1016",
    verbalEducation: ["맞춤형 운동 처방", "혈압 일지 작성 교육"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:00",
    educationPrograms: ["운동상담", "생활습관 코칭"],
  },
  {
    name: "성북구 길음내과의원",
    address: "서울특별시 성북구 도봉로 17",
    detailAddress: "서울특별시 성북구 도봉로 17, 4층",
    phoneNumber: "02-915-1017",
    verbalEducation: ["저염식 가이드", "가정혈압 측정법"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "17:30",
    educationPrograms: ["복약상담", "혈압기 사용법"],
  },
  {
    name: "송파구 잠실내과센터",
    address: "서울특별시 송파구 올림픽로 300",
    detailAddress: "서울특별시 송파구 올림픽로 300, 8층",
    phoneNumber: "02-421-1018",
    verbalEducation: ["맞춤형 운동 처방", "저염식 가이드"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:30",
    educationPrograms: ["식단상담", "운동상담"],
  },
  {
    name: "양천구 목동내과의원",
    address: "서울특별시 양천구 목동동로 223",
    detailAddress: "서울특별시 양천구 목동동로 223, 5층",
    phoneNumber: "02-2643-1019",
    verbalEducation: ["생활습관 코칭", "체중관리 교육"],
    isCurrentlyAvailable: true,
    openTime: "09:30",
    closeTime: "18:00",
    educationPrograms: ["생활습관 코칭", "식이교육"],
  },
  {
    name: "영등포구 여의도내과",
    address: "서울특별시 영등포구 국제금융로 10",
    detailAddress: "서울특별시 영등포구 국제금융로 10, 4층",
    phoneNumber: "02-786-1020",
    verbalEducation: ["저염식 가이드", "복약 순응도 교육"],
    isCurrentlyAvailable: true,
    openTime: "08:30",
    closeTime: "17:30",
    educationPrograms: ["복약상담", "운동상담"],
  },
  {
    name: "용산구 이태원내과의원",
    address: "서울특별시 용산구 이태원로 179",
    detailAddress: "서울특별시 용산구 이태원로 179, 2층",
    phoneNumber: "02-794-1021",
    verbalEducation: ["맞춤형 운동 처방", "가정혈압 측정법"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:00",
    educationPrograms: ["운동상담", "혈압기 사용법"],
  },
  {
    name: "은평구 불광내과센터",
    address: "서울특별시 은평구 통일로 856",
    detailAddress: "서울특별시 은평구 통일로 856, 4층",
    phoneNumber: "02-356-1022",
    verbalEducation: ["저염식 가이드", "혈압 일지 작성 교육"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "17:30",
    educationPrograms: ["식이교육", "복약상담"],
  },
  {
    name: "종로구 광화문내과의원",
    address: "서울특별시 종로구 종로 33",
    detailAddress: "서울특별시 종로구 종로 33, 6층",
    phoneNumber: "02-732-1023",
    verbalEducation: ["맞춤형 운동 처방", "생활습관 코칭"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:00",
    educationPrograms: ["생활습관 코칭", "운동상담"],
  },
  {
    name: "중구 명동내과센터",
    address: "서울특별시 중구 명동길 26",
    detailAddress: "서울특별시 중구 명동길 26, 5층",
    phoneNumber: "02-777-1024",
    verbalEducation: ["저염식 가이드", "복약 순응도 교육"],
    isCurrentlyAvailable: true,
    openTime: "08:30",
    closeTime: "17:30",
    educationPrograms: ["복약상담", "식단상담"],
  },
  {
    name: "중랑구 상봉내과의원",
    address: "서울특별시 중랑구 망우로 353",
    detailAddress: "서울특별시 중랑구 망우로 353, 3층",
    phoneNumber: "02-434-1025",
    verbalEducation: ["맞춤형 운동 처방", "가정혈압 측정법"],
    isCurrentlyAvailable: true,
    openTime: "09:00",
    closeTime: "18:00",
    educationPrograms: ["운동상담", "혈압기 사용법"],
  },
];

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function isHospitalOpenNow(openTime: string, closeTime: string) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return currentMinutes >= toMinutes(openTime) && currentMinutes <= toMinutes(closeTime);
}

export default function Home() {
  const [showHospitalList, setShowHospitalList] = useState(false);
  const [hospitalFilter, setHospitalFilter] = useState<"medication" | "verbalRehab" | "exercise">(
    "medication",
  );
  const [showMap, setShowMap] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const hospitalList = useMemo(() => HOSPITALS, []);
  const categorizedHospitals = useMemo(
    () =>
      hospitalList.map((hospital, index) => {
        const inferredServiceType: NonNullable<Hospital["serviceType"]> =
          index % 3 === 0 ? "medication" : index % 3 === 1 ? "verbalRehab" : "exercise";

        if (inferredServiceType === "verbalRehab") {
          return {
            ...hospital,
            serviceType: inferredServiceType,
          };
        }

        return {
          ...hospital,
          serviceType: inferredServiceType,
        };
      }),
    [hospitalList],
  );

  const filteredHospitals = useMemo(() => {
    return categorizedHospitals.filter((hospital) => hospital.serviceType === hospitalFilter);
  }, [categorizedHospitals, hospitalFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 py-8 md:px-10">
        {/* 상단 네비바 */}
        <header className="relative mb-10 flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center">
            <div className="flex h-16 w-60 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
              <Image
                src="/chs.png"
                alt="로고 이미지"
                width={220}
                height={56}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
          <span className="absolute right-5 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white">
            2026 캠페인
          </span>
        </header>

        <p className="mb-6 text-sm text-slate-600">조사시기: 2026년 5월 16일 ~ 7월 31일</p>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-slate-600">협력 기관</p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
            {PARTNER_LOGOS.map((logoName) => (
              <div
                key={logoName}
                className="flex h-16 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-2 text-center text-sm font-bold text-slate-700"
              >
                {logoName === "질병관리청" ? (
                  <Image
                    src="/kdca.png"
                    alt="질병관리청 로고"
                    width={150}
                    height={44}
                    className="h-auto w-[150px] object-contain"
                  />
                ) : logoName === "서울특별시" ? (
                  <Image
                    src="/seoul.png"
                    alt="서울특별시 로고"
                    width={150}
                    height={44}
                    className="h-auto w-[150px] object-contain"
                  />
                ) : logoName === "인제대학교" ? (
                  <Image
                    src="/inje.png"
                    alt="인제대학교 로고"
                    width={150}
                    height={44}
                    className="h-auto w-[150px] object-contain"
                  />
                ) : logoName === "경희대학교" ? (
                  <Image
                    src="/kh.png"
                    alt="경희대학교 로고"
                    width={150}
                    height={44}
                    className="h-auto w-[150px] object-contain"
                  />
                ) : logoName === "서울대학교" ? (
                  <Image
                    src="/seoul uni.png"
                    alt="서울대학교 로고"
                    width={150}
                    height={44}
                    className="h-auto w-[150px] object-contain"
                  />
                ) : (
                  logoName
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 히어로 섹션 */}
        <section className="mb-8 rounded-3xl bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-50 p-8 md:p-12">
          <h1 className="max-w-4xl text-2xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            서울시민 고혈압 치료율 표준화율은 92.3%, 나머지 7.7%의 건강을 찾습니다
          </h1>
        </section>

        {/* 통계 카드 */}
        <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">2024 지역사회건강조사</p>
            <p className="mt-2 text-4xl font-extrabold text-sky-700">92.3%</p>
            <p className="mt-1 text-sm text-slate-600">고혈압 치료율 표준화율</p>
            <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-sky-500" style={{ width: "92.3%" }} />
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">2024 지역사회건강조사</p>
            <p className="mt-2 text-4xl font-extrabold text-rose-600">7.7%</p>
            <p className="mt-1 text-sm text-slate-600">관리 공백 추정 비율</p>
            <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-rose-500" style={{ width: "7.7%" }} />
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">목표</p>
            <p className="mt-2 text-4xl font-extrabold text-emerald-600">100%</p>
            <p className="mt-1 text-sm text-slate-600">치료 연계율 달성</p>
            <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-emerald-500" style={{ width: "100%" }} />
            </div>
          </article>
        </section>

        {/* 버튼 4개 */}
        <section className="mb-12 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="w-full rounded-xl bg-sky-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-sky-700 sm:w-auto"
            onClick={() => {
              setHospitalFilter("medication");
              setShowHospitalList(true);
              setShowMap(false);
            }}
          >
            약물 치료 바로 가능한 병원 보기
          </button>
          <button
            type="button"
            className="w-full rounded-xl border border-sky-200 bg-sky-50 px-6 py-4 text-base font-semibold text-sky-800 transition hover:bg-sky-100 sm:w-auto"
            onClick={() => {
              setHospitalFilter("verbalRehab");
              setShowHospitalList(true);
              setShowMap(false);
            }}
          >
            구두 교육 가능 병원 보기
          </button>
          <button
            type="button"
            className="w-full rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-4 text-base font-semibold text-indigo-800 transition hover:bg-indigo-100 sm:w-auto"
            onClick={() => {
              setHospitalFilter("exercise");
              setShowHospitalList(true);
              setShowMap(false);
            }}
          >
            운동 치료 가능 병원 보기
          </button>
          <button
            type="button"
            className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-base font-semibold text-emerald-800 transition hover:bg-emerald-100 sm:w-auto"
            onClick={() => {
              setShowMap(true);
              setShowHospitalList(false);
            }}
          >
            지도 보기
          </button>
        </section>

        {showMap && (
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">서울 지도</h2>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <Image
                src="/seoul map.png"
                alt="서울 지도"
                width={1200}
                height={800}
                className="h-auto w-full object-contain"
              />
            </div>
          </section>
        )}

        {showHospitalList && (
          <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">내 주변 내과 진료 기관</h2>
              <span className="text-sm text-slate-500">
                {hospitalFilter === "medication"
                  ? `약물 치료 즉시 가능 기관 ${filteredHospitals.length}곳`
                  : hospitalFilter === "verbalRehab"
                  ? `구두 교육 가능 기관 ${filteredHospitals.length}곳`
                  : `운동 치료 가능 기관 ${filteredHospitals.length}곳`}
              </span>
            </div>

            <ul className="space-y-4">
              {filteredHospitals.map((hospital) => {
                const isOpenNow =
                  hospital.isCurrentlyAvailable &&
                  isHospitalOpenNow(hospital.openTime, hospital.closeTime);

                return (
                  <li
                    key={hospital.name}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <button
                          type="button"
                          className="text-base font-semibold text-slate-900 underline-offset-2 hover:underline"
                          onClick={() => setSelectedHospital(hospital)}
                        >
                          {hospital.name}
                        </button>
                        <p className="mt-1 text-sm text-slate-600">{hospital.address}</p>
                        <p className="mt-2 text-xs text-slate-500">
                          진료시간: {hospital.openTime} ~ {hospital.closeTime}
                        </p>
                      </div>

                      <div className="flex flex-col items-start gap-2 md:items-end">
                        <span
                          className={`text-sm font-bold ${
                            isOpenNow ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {isOpenNow ? "진료 중" : "진료 종료"}
                        </span>

                        {hospital.educationPrograms && (
                          <>
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                              구두 교육(비약물 치료) 우수 기관
                            </span>
                            <p className="text-xs text-blue-700">
                              {hospital.educationPrograms.join(", ")}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {selectedHospital && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-slate-900">{selectedHospital.name}</h3>
                <button
                  type="button"
                  className="rounded-lg px-3 py-1 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  onClick={() => setSelectedHospital(null)}
                >
                  닫기
                </button>
              </div>

              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  <span className="mr-2 font-semibold text-slate-900">전화번호</span>
                  {selectedHospital.phoneNumber}
                </p>
                <p>
                  <span className="mr-2 font-semibold text-slate-900">상세 주소</span>
                  {selectedHospital.detailAddress}
                </p>
                <div>
                  <p className="mb-1 font-semibold text-slate-900">구두 교육 내용</p>
                  <p>{selectedHospital.verbalEducation.join(", ")}</p>
                </div>
              </div>

              <a
                href={`tel:${selectedHospital.phoneNumber.replace(/-/g, "")}`}
                className="mt-6 block w-full rounded-xl bg-sky-600 px-5 py-3 text-center text-base font-semibold text-white transition hover:bg-sky-700"
              >
                지금 바로 전화 문의
              </a>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}