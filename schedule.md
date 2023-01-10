~01/10 1차 완성
focusing + css 텍스트설명.

~01/14 품질향상
sun, jupiter - Shader material로 변경 - 불타는 효과, 가스 표현

~01/16 성능향상
class간 parameter전달 최소화하여 가독성 향상. Sizes, Elementd2D class등을 singleton 구현 혹은 구조재설계  
tick 연산 줄일 것. (매 프레임 X, 단계별로)
transform(positoin, scale, rotation) => matrix연산으로 변경.
행성궤도 6개 (RingGeometry) => BufferGeometry와 shaderMaterial로 한개로 통합
background small star들 6개의 Point mesh => ShaderMaterial Points mesh 한개로 통합.
PointLigh 없애고 blender로 그림자 baking.

01/19 잡코리아 페이브 지원
