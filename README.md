📜: Paper link
🧑🏻‍💻: Developer blog & Github link
🗞️: News

---
# 2024
## ☃ February
<details>
  <summary>1st ~ 3rd week</summary>

- 📜 [Cohere] [Aya Model: An Instruction Finetuned Open-Access Multilingual Language Model](https://arxiv.org/abs/2402.07827)
    - 119개국, 3,000여 명의 연구자가 참여한 다국어 모델 연구 프로젝트의 결과물. 데이터셋도 오픈소스로 제공 (513M 개 instruction fine-tuning 데이터셋)
- 📜 [OS-Copilot: Towards Generalist Computer Agents with Self-Improvement](https://arxiv.org/abs/2402.07456)
- 🧑🏻‍💻 [OpenAI] [Memory and new controls for ChatGPT](https://openai.com/blog/memory-and-new-controls-for-chatgpt)
    - ChatGPT를 이용할 때 과거의 채팅 내역을 현재 채팅에서의 memory로 활용하여 개인 맞춤으로 만들 수 있다. 아직 일부 유저 대상으로 테스트 중인 기능.
- 🧑🏻‍💻 [NVIDIA] [Say What? Chat With RTX Brings Custom Chatbot to NVIDIA RTX AI PCs](https://blogs.nvidia.com/blog/chat-with-rtx-available-now/)
- 🗞️ [Nvidia briefly beats Amazon and nears Alphabet’s market cap amid AI hype](https://aibeat.co/nvidia-briefly-beats-amazon-in-market-value/)
- 🧑🏻‍💻 [DeepLearning.AI] [Serverless LLM apps with Amazon Bedrock](https://www.deeplearning.ai/short-courses/serverless-llm-apps-amazon-bedrock/)
- 📜 [On the Self-Verification Limitations of Large Language Models on Reasoning and Planning Tasks](https://arxiv.org/abs/2402.08115)
- 📜 [Google DeepMind] [Transformers Can Achieve Length Generalization But Not Robustly](https://arxiv.org/abs/2402.09371)
    - 트랜스포머도 제한적으로 입력 길이를 늘릴(extrapolate) 수 있다. (약 2.5배). 하지만 일반화 가능한 세팅은 아님.
- 📜 [Google DeepMind] [Chain-of-Thought Reasoning Without Prompting](https://arxiv.org/abs/2402.10200)
    - 말 그대로 프롬프트 없이 CoT Reasoning을 유도할 수 있다. Decoding process를 조정함
- 🧑🏻‍💻 [Google] [Our next-generation model: Gemini 1.5](https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/)
    - 무려 입력을 1M 토큰으로 받을 수 있다고 주장하는 Gemini 1.5 버전이 등장. 배포 준비는 되었으나 아직 배포하지 않은 것으로 알려짐.
- 🧑🏻‍💻 [OpenAI] [Sora: Creating video from text](https://openai.com/sora)
    - OpenAI에서 만든 최초의 Text-to-Video 모델. 입이 떡 벌어질 정도의 성능으로 여러 커뮤니티에서 화제를 불러일으키는 중.
- 📜 [Apple] [Guiding Instruction-based Image Editing via Multimodal Large Language Models](https://arxiv.org/abs/2309.17102)
    - 이미지 편집에 있어서 전문적인 지식 없이 텍스트만을 이용하는데 그 결과물이 아주 뛰어남. ICLR’24 Spotlight 논문.
- 📜 [Using Counterfactual Tasks to Evaluate the Generality of Analogical Reasoning in Large Language Models](https://arxiv.org/abs/2402.08955)
- 🗞️ [Slack AI is here, letting you catch up on lengthy threads and unread messages](https://www.theverge.com/2024/2/14/24070590/slack-ai-launch-thread-summaries-search-recap)
    - 읽지 않은 스레드 요약 기능. 아직 UK & US에서만 이용 가능
- 📜 [Google DeepMind & Research] [A Human-Inspired Reading Agent with Gist Memory of Very Long Contexts](https://arxiv.org/abs/2402.09727)
    - [gist memories]에 에피소드를 저장하여 ReadAgent가 task와 관련 있는 정보를 빠르게 가져오도록 하는 방식. 사람이 긴 글을 읽는 방식에서 착안.
- 📜 [DoRA: Weight-Decomposed Low-Rank Adaptation](https://arxiv.org/abs/2402.09353)
    - LoRA와 FT 사이의 gap을 줄이기 위해 pre-trained weight를 magnitude와 direction으로 분해하는 방법을 도입
- 📜 [Can We Verify Step by Step for Incorrect Answer Detection?](https://arxiv.org/abs/2402.10528)
    - CoT의 각 step에 대해 process discernibility score (PDS)를 구하여 answer-checking baseline을 제공
- 🧑🏻‍💻 [minbpe](https://github.com/karpathy/minbpe)
    - Karpathy가 OpenAI를 퇴사하며 공개한 BPE 코드. 나만의 토크나이저를 만들 수 있다.
- 🧑🏻‍💻 [Meta] [V-JEPA](https://ai.meta.com/research/publications/revisiting-feature-prediction-for-learning-visual-representations-from-video/)
    - 아주 적은 양의 labeled data로 self-supervise한 모델로, 생성형이 아님. 새로운 컨셉 Joint Embedding Predictive Architecture를 제안.
</details>

<details>
  <summary>4th week</summary>
  
- 📜 [Linear Transformers with Learnable Kernel Functions are Better In-Context Models](https://arxiv.org/abs/2402.10644)
  - Transformer 기반의 모델들의 성능을 능가한다고 제안되었던 State Space Models에게 부족한 In-Context Learning 능력을 채워주기 위한 방법을 도입. Taylor Expansion을 활용.
- 📜 [DataDreamer: A Tool for Synthetic Data Generation and Reproducible LLM Workflows](https://arxiv.org/abs/2402.10379)
    - LLM 학습에 활용되는 데이터셋 관련 워크 플로우를 재현 가능하도록 도와주는 프레임워크. 특히 합성 데이터 생성이 포함된 것이 특징.
- 📜 [AnyGPT: Unified Multimodal LLM with Discrete Sequence Modeling](https://arxiv.org/abs/2402.12226)
    - 음성, 텍스트, 이미지, 음악을 discrete token으로 입력 받아 autoregressive하게 처리하는 멀티모달 모델. 데이터 수준의 전처리만 필요.
- 📜 [Direct Evaluation of Chain-of-Thought in Multi-hop Reasoning with Knowledge Graphs](https://arxiv.org/abs/2402.11199)
    - Knowledge Graph를 활용하여 올바른 추론 과정을 통해 최종 정답이 도출되었는지 검증
- 📜 [Boosting of Thoughts: Trial-and-Error Problem Solving with Large Language Models](https://arxiv.org/abs/2402.11140)
    - Tree of Thoughts를 반복적으로 trial-and-error 과정에 포함시켜 최종 결과를 도출해내는 방식
- 🗞️ [SoftBank’s Masayoshi Son is reportedly seeking $100B to build a new AI chip venture](https://techcrunch.com/2024/02/19/softbanks-masayoshi-son-is-reportedly-seeking-100b-to-build-a-new-ai-chip-venture/)
    - 소프트뱅크 손정의 회장이 새로운 AI 칩 개발을 위해 133조 규모의 자금을 모집
- 📜 [The FinBen: An Holistic Financial Benchmark for Large Language Models](https://arxiv.org/abs/2402.12659)
    - 금융 도메인 오픈 소스 벤치마크
- 🧑🏻‍💻 [cosmopedia](https://huggingface.co/datasets/HuggingFaceTB/cosmopedia)
    - Mistral-8x7B-Instruct-v0.1에 의해 생성된 textbooks, blogposts, stories, post, WikiHow articles 합성 데이터셋. 30M files, 25B tokens
- 🧑🏻‍💻 [Andrej Karphathy] [Let’s build the GPT Tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE)
    - 최근 공개한 GPT Tokenizer와 관련해서 카파시가 직접 촬영한 2시간 분량의 강의 영상
- 📜 [Microsoft] [Synthetic Data (Almost) from Scratch: Generalized Instruction Tuning for Language Models](https://arxiv.org/abs/2402.13064)
    - human knowledge와 capability에 관한 taxonomy를 입력으로 받고 이를 decomposition → recombine하여 다앙햔 instruction data를 생성
- 🧑🏻‍💻 [Google DeepMind] [Gemma: Introducing new state-of-the-art open models](https://blog.google/technology/developers/gemma-open-models/)
    - 6T 토큰으로 학습하여 오픈 소스로 공개한 2B, 7B 모델. instruction version도 있음.
- 🧑🏻‍💻 [Kaggle] [Google – AI Assistants for Data Tasks with Gemma](https://www.kaggle.com/competitions/data-assistants-with-gemma/)
    - data science concepts, Python programming, Kaggle solution 등에 대해 답변할 수 있는 Gemma 노트북을 만드는 것이 goal
- 📜 [ARL2: Aligning Retrievers for Black-box Large Language Models via Self-guided Adaptive Relevance Labeling](https://arxiv.org/abs/2402.13542)
    - (1) LLM 스스로 diverse & high-quality training dataset을 구축 → (2) relevance supervision을 바탕으로 retriever를 학습 → (3) augmented evidence를 바탕으로 답변을 생성
- 📜 [Making Reasoning Matter: Measuring and Improving Faithfulness of Chain-of-Thought Reasoning](https://arxiv.org/abs/2402.13950)
    - small-sized LM이 올바른 reasoning step을 생성할 수 있도록 하는 프레임워크 FRODO를 제안. 이는 inference module과 reasoning module로 구성됨
- 🧑🏻‍💻 [Aria Everyday Activities Dataset](https://huggingface.co/papers/2402.13349)
    - 143일 간의 활동을 담은 3D 오픈소스 데이터셋
- 📜 [Microsoft Research] [LongRoPE: Extending LLM Context Window Beyond 2 Million Tokens](https://arxiv.org/abs/2402.13753)
    - 256k training length로 1k fine-tuning step 적용 가능 → 2048k 토큰까지 커버. 두 가지 형태의 non-uniformities in positional interpolation & second positional interpolation & 8k 길이의 short context를 커버할 수 있도록 readjust
- 📜 [Yonsei University] [KMMLU: Measuring Massive Multitask Language Understanding in Korean](https://arxiv.org/abs/2402.11548)
    - 45개의 주제를 아우르는 35,030개의 expert-level multiple-choice questions. human performance는 62.6%로 GPT-4, HyperCLOVA X는 각각 59.95%, 53.40%의 성능을 보임
- 📜 [OpenCodeInterpreter: Integrating Code Generation with Execution and Refinement](https://arxiv.org/abs/2402.14658)
    - Code-Feedback (iterative refinement) 테크닉 적용, 68K multi-turn interactions 데이터셋, GPT-4 인터프리터와 같은 모델을 오픈 소스로 공개
- 🗞️ [Adobe Acrobat adds generative AI to ‘easily chat with documents’](https://www.theverge.com/2024/2/20/24077217/adobe-acrobat-generative-ai-assistant-chatbot-pdf-document)
    - AI Assistant in Acrobat (conversational engine)
- 📜 [Hint-before-Solving Prompting: Guiding LLMs to Effectively Utilize Encoded Knowledge](https://arxiv.org/abs/2402.14310)
    - Reasoning tasks에서 문제를 풀기 전에 hint를 제공하는 prompting 방식으로 더 좋은 퍼포먼스를 이끌어냄
- 📜 [CriticBench: Benchmarking LLMs for Critique-Correct Reasoning](https://arxiv.org/abs/2402.14809)
    - LLM의 critique and rectify their reasoning 능력을 평가할 수 있는 15개의 데이터셋으로 구성
- 📜 [YOLOv9: Learning What You Want to Learn Using Programmable Gradient Information](https://arxiv.org/abs/2402.13616)
- 🧑🏻‍💻 [Stability.ai] [Stable Diffusion 3](https://stability.ai/news/stable-diffusion-3?utm_source=www.theaivalley.com)
</details>

<details>
  <summary>5th week</summary>
  
- 📜 [UC Berkely] [LoRA+: Efficient Low Rank Adaptation of Large Models](https://arxiv.org/abs/2402.12354)
    - 기존 LoRA가 suboptimal하다는 문제점을 지적하며 성능을 1~2% 개선함과 동시에 속도는 최대 2배까지 향상시킨 adaptation 기법을 제시
    - 기존의 LoRA에서 사용하는 adapater 행렬 A와 B는 고정된 learning rate로 업데이트된다는 점이 문제임 → 두 행렬의 learning rate를 조절함으로써 퍼포먼스와 학습 속도를 향상시킬 수 있는 알고리즘 LoRA+ 를 제시
- 📜 [OlympiadBench: A Challenging Benchmark for Promoting AGI with Olympiad-Level Bilingual Multimodal Scientific Problems](https://arxiv.org/abs/2402.14008)
    - 올림피아드 수준의 과학 문제로 구성된 벤치마크. 8,952개의 수학 및 물리 문제로 구성되어 있으며 전문가 수준의 step-by-step reasoning annotation을 포함
- 📜 [Large Language Models for Data Annotation: A Survey](https://arxiv.org/abs/2402.13446)
    - LLM을 annotation에 활용한 학습 기법이나 방법론에 대한 서베이 페이퍼
- 📜 [Purifying Large Language Models by Ensembling a Small Language Model](https://arxiv.org/abs/2402.14845)
    - 언어 모델 학습에 사용된 민감한 정보들이나 data poisioning 관련 이슈 등을 처리하는 방법론으로 SLM ensemeble을 제시
- 📜 [Distillation Contrastive Decoding: Improving LLMs Reasoning with Contrastive Decoding and Distillation](https://arxiv.org/abs/2402.14874)
    - expert & amateur 모델을 필요로 하는 Contrastive Decoding 방식의 한계를 극복하기 위해 dropout과 quantization을 적용
- 📜 [tinyBenchmarks: evaluating LLMs with fewer examples](https://arxiv.org/abs/2402.14992)
    - 현존하는 벤치마크 데이터셋은 지나치게 많은 케이스를 포함하고 있다. 이와 동일한 수준의 평가가 가능한 소수의 examples를 curate.
- 🧑🏻‍💻 [Google DeepMind] 🧞 [Genie: Generative Interactive Environments](https://sites.google.com/view/genie-2024)
    - single image prompt로 게임 만들기..
- 🧑🏻‍💻 [Mistral AI] [Le Chat Mistral](https://chat.mistral.ai/chat)
    - Mistral에서 제공하는 챗봇 서비스
- 🧑🏻‍💻 [Mitral AI] [Au Large](https://mistral.ai/news/mistral-large/)
    - Mistral에서 출시한 새로운 플래그십 모델. GPT-4의 뒤를 잇는 수준의 성능이며 API를 통해 이용 가능 (Le Plateforme, Azure, Self-deployment)
- 📜 [Microsoft Research] 🐳 [Orca-Math: Unlocking the potential of SLMs in Grade School Math](https://arxiv.org/abs/2402.14830)
    - Mistral-7B 모델을 베이스로 학습한 7B 모델 Orca-Math. 200K 개의 고품질 합성 데이터, feedback을 통합시키는 학습 방식 등이 활용됨. Llama-2-70B, ChatGPT-3.5 등을 능가하는 퍼포먼스
- 🧑🏻‍💻 [Argilla] [OpenHermesPreferences - a dataset of 1M AI preferences for RLAIF and DPO](https://huggingface.co/datasets/argilla/OpenHermesPreferences)
    - Mixtral-8x7B-Instruct-v0.1, Nous-Hermes-2-Yi-34B, PairRM 등으로부터 획득한 1M 개의 AI preferences 데이터셋. DPO or RLAIF 에 활용 가능
- 📜 [LLMs with Chain-of-Thought Are Non-Causal Reasoners](https://arxiv.org/abs/2402.16048)
    - CoT는 올바르지만 정답을 도출하지 못한 케이스, 그리고 그 반대의 케이스들에 대한 분석
- 📜 [Look Before You Leap: Problem Elaboration Prompting Improves Mathematical Reasoning in Large Language Models](https://arxiv.org/abs/2402.15764)
    - 복잡한 추론 태스크에 대해서 problem context를 분해 및 설명함으로써 문제 해결 능력을 향상 시킴 (Problem Elaboration Prompting, PEP)
- 🗞️ [Apple cancels work on electric car, shifts team to generative AI](https://economictimes.indiatimes.com/tech/technology/apple-cancels-work-on-electric-car-shifts-team-to-generative-ai/articleshow/108052606.cms)
    - 애플이 더이상 전기차를 만들지 않고 생성형 AI 개발에 집중한다는 소식
- 📜 [Reasoning in Conversation: Solving Subjective Tasks through Dialogue Simulation for Large Language Models](https://arxiv.org/abs/2402.17226)
    - LLM이 주관적인 태스크를 처리할 때는 객관적인 태스크를 처리할 때에 비해 열등한 성능을 보임. 이를 해결하기 위한 방법으로 CoT와 같은 rationale 제시 방식 대신 dialogue를 도입.
- 🧑🏻‍💻 [DeepLearning.AI] [Prompt Engineering with Llama 2](https://www.deeplearning.ai/short-courses/prompt-engineering-with-llama-2/)
    - Meta의 Llama 2를 활용하여 few-shot prompting과 같은 prompt engineering에 대해 학습
</details>


## 🌱 March
<details>
  <summary>1st ~ 2nd week</summary>
  
- 🧑🏻‍💻 OpenAI API’s change on log probabilities from 5 to 20 return
- 🗞️ [Robotics startup Figure raises $675 mln from Microsoft, Nvidia, OpenAI](https://www.reuters.com/technology/robotics-startup-figure-raises-675-mln-microsoft-nvidia-other-big-techs-2024-02-29/)
    - IT 공룡 기업들이 로봇 분야에도 적극적으로 투자하고 있다는 소식
- 📜 [IIT] [How to think step-by-step: A mechanistic understanding of chain-of-thought reasoning](https://arxiv.org/abs/2402.18312)
    - CoT에 대해 layer별로 분석. token representation을 확인한 결과 중간 이전의 layer에서는 사전 학습데이터에 대해 편향되어 있으나 중간 이후부터는 급격히 in-context에 집중
- 📜 [Rice University] [Learning to Compress Prompt in Natural Language Formats](https://arxiv.org/abs/2402.18700)
    - API에 대해서는 soft prompt compression을 적용할 수 없기 때문에 자연어 형태로 compression하는 방법을 제시. 여기에 사용되는 것이 Natrual Language Prompt Encapsulation (Nano-Capsulator) framework.
- 📜 [Microsoft] [ResLoRA: Identity Residual Mapping in Low-Rank Adaption](https://arxiv.org/abs/2402.18039)
    - original model의 long calculation path를 동일하게 거쳐야 하는 LoRA의 한계를 보완하기 위해 학습 동안에 residual path를 더하고, 추론 동안에는 이러한 extra path를 제거하기 위한 merging approach를 사용 → LoRA와 대비 학습 및 추론 cost는 더 낮으면서도 performance는 더 좋음
- 📜 [Datasets for Large Language Models: A Comprehensive Survey](https://arxiv.org/abs/2402.18041)
    - 8개 언어, 32개 도메인, 444개 데이터셋에 대한 서베이 논문. 총 774.5TB에 달하는 사전학습 corpora를 분류
- 📜 [Apple] [LUCID: LLM-Generated Utterances for Complex and Interesting Dialogues](https://arxiv.org/abs/2403.00462)
    - 4,277개에 달하는 multi-domain, multi-intent conversation를 생성하기 위해 LUCID를 사용 (LLM-generated Utterances for Complex and Interesting Dialogues)
- 📜 [An Empirical Categorization of Prompting Techniques for Large Language Models: A Practitioner's Guide](https://arxiv.org/abs/2402.14837)
    - 7개의 카테고리로 구분하여 academic하면서도 pragmatic한 내용의 prompting 테크닉을 정리한 서베이 페이퍼
- 📜 [Meta] [Learning and Leveraging World Models in Visual Representation Learning](https://arxiv.org/abs/2403.00504)
    - Joint-Embedding Predictive Architecture (JEPA)에 conditioning, prediction difficulty, capacity 개념을 더한 Image Word Models를 제시. 얀 르쿤이 연구에 참여
- 🧑🏻‍💻 [Anthropic] [Introducing the next generation of Claude](https://www.anthropic.com/news/claude-3-family)
    - Haiku, Sonnet, Opus로 구성된 Claude 3 family를 공개. 159개 국가에서 API 이용 가능. (자신들의 주장으로는) 여러 벤치마크에서 GPT-4를 능가하는 성능. Vision 관련 능력도 뛰어난 편. 불필요한 거절 메세지 반환율도 크게 떨어짐 (이전 버전에서의 이슈). 200K의 window size로 출시되었으나 특정 고객들에 한해 1M 토큰도 처리 가능하게끔 할 수 있음을 언급.
- 📜 [Distilling Text Style Transfer With Self-Explanation From LLMs](https://arxiv.org/abs/2403.01106)
    - test style transfer 분야에서 부족한 parallel 데이터셋을 구축. 여기에 LLM distillation을 활용
- 📜 [Stanford, Georgia Tech, Microsoft, Google DeepMind] [Design2Code: How Far Are We From Automating Front-End Engineering?](https://arxiv.org/abs/2403.03163)
    - 실제 484개의 웹페이지를 테스크 케이스로 두고 Design2Code task를 평가하는 벤치마크를 구축. Gemini Pro Vision에 버금가는 Design2Code-18B 모델을 fine-tuning
- 📜 [PHAnToM: Personality Has An Effect on Theory-of-Mind Reasoning in Large Language Models](https://arxiv.org/abs/2403.02246)
    - Theory of Mind (ToM) Reasoning을 이끌어내기 위해 필요한 personality가 어떤 것인지에 대한 연구. 특정 personality가 ToM 관련 태스크의 성능을 높이는 데 도움이 되는 것을 확인.
- 🧑🏻‍💻 [2024 오픈소스 컨트리뷰션 아카데미 [체험형] 멘티 모집](https://www.contribution.ac/)
    - ‘Git 활용 및 Gemma를 이용한 LLM 앱 개발’
- 🧑🏻‍💻 [Elon Musk and OpenAI’s fiery battle](https://openai.com/blog/openai-elon-musk)
    - OpenAI’s blog posting about Elon Musk’s accusation
- 🧑🏻‍💻 [Claude 3’s system prompt](https://twitter.com/AmandaAskell/status/1765207842993434880?) (X link)
- 📜 [Benchmarking Hallucination in Large Language Models based on Unanswerable Math Word Problem](https://arxiv.org/abs/2403.03558)
    - 기존 Math Word Problem 데이터셋을 기반으로 unanswerable problems를 포함하는 새로운 벤치마크를 구축. 대답 가능한 문제와 그렇지 않은 문제 각 2,600개씩 구성. InstructGPT, Claude, LLaMA 시리즈로 검증.
- 📜 [ShortGPT: Layers in Large Language Models are More Redundant Than You Expect](https://arxiv.org/abs/2403.03853)
    - LLM의 특정 layer들이 높은 유사도를 가진다는 것은 불필요한 layer가 포함되어 있다는 뜻 → Block Influence (BI)라는 metric을 정의하여 각 layer의 중요도를 측정 → pruning에서 SoTA를 달성한 ShortGPT를 개발
- 📜 [GaLore: Memory-Efficient LLM Training by Gradient Low-Rank Projection](https://arxiv.org/abs/2403.03507)
    - full parameter learning을 사용하지만 LoRA보다도 memory-efficient한 학습 전략인 Graident Low-Rank Projection (GaLore)를 제시. 7B 모델을 24GB 메모리 GPU 한 대로 병렬 처리 없이 pre-training 가능하도록 만드는 테크닉.
- 📜 [SaulLM-7B: A pioneering Large Language Model for Law](https://arxiv.org/abs/2403.03883)
    - Mistral 7B 모델을 베이스로 법률 데이터로 continual pre-training & instruction fine-tuning한 모델 SaulLM-7B 모델을 공개. 30B 토큰의 법률 데이터로 학습했다고 함.
- 🗞️ [Salesforce announces new AI tools for doctors](https://www.cnbc.com/2024/03/07/salesforce-announces-new-ai-tools-for-doctors.html)
    - 세일즈포스에서 의료 분야의 행정적 업무 부담을 완화해줄 수 있는 Einstein Copilot을 출시
- 📜 [Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference](https://arxiv.org/abs/2403.04132)
    - LLM 성능 평가 결과를 나타내는 리더보드로 널리 사용되는 [챗봇 아레나](https://chat.lmsys.org/)에 대한 설명이 담긴 논문. 사용된 메트릭이나 지금까지의 평가 결과에 대한 분석을 포함하고 있음
- 📜 [Yi: Open Foundation Models by 01.AI](https://arxiv.org/abs/2403.04652)
    - 01.AI에서 출시한 LLM, Yi. 6B, 34B 사이즈의 사전학습 모델이며 200K의 context length, depth-upscaled model, vision-language model 이라는 특징을 지님
- 📜 [Meta] [Teaching Large Language Models to Reason with Reinforcement Learning](https://arxiv.org/abs/2403.04642)
    - feedback으로부터 배우는 여러 알고리즘 (Expert Iteration, Proximal Policy Optimization, Return-Conditioned RL)에 대한 비교 연구
- 🧑🏻‍💻 🦁 [WildBench: Benchmarking LLMs with Challenging Tasks from Real Users in the Wild](https://huggingface.co/spaces/allenai/WildBench)
    - 보다 현실적이고 난이도가 높은, real-world에서 나올 법한 것들로 Benchmark를 구성. [깃허브](https://github.com/allenai/WildBench), [리더보드](https://huggingface.co/spaces/allenai/WildBench), [허깅페이스](https://huggingface.co/datasets/allenai/WildBench)
- 🧑🏻‍💻 [mamba_peft.py on HuggingFace](https://gist.github.com/ArthurZucker/743dd7962f21b6ab4a21f692c82b9246)
    - mamba를 이제 transformers에서 이용할 수 있음. 위 링크는 PEFT example 코드.
- 🧑🏻‍💻 [Foundation Model Development Cheatsheet](https://fmcheatsheet.org/)
    - 각종 모델 및 데이터셋을 카테고리와 모달리티로 구분하여 한 번에 확인할 수 있는 사이트
- 📜 [Learning to Generate Instruction Tuning Datasets for Zero-Shot Task Adaptation](https://arxiv.org/abs/2402.18334)
    - 1.65M 개의 examples로 학습된 오픈소스 모델 for conditional task generation. unannotated text를 instruction tuning을 위한 task-specific training datasets으로 변환
</details>

<details>
  <summary>3rd week</summary>
  
- 🧑🏻‍💻 [Gen AI Korea 2024] [생성형 AI 레드팀 챌린지](https://www.aiignite.org/)
    - 4월 11일 (목) ~ 4월 12일 (금), 코엑스에서 진행되는 챌린지 및 컨퍼런스. Cohere 대표, Kakao 이사, 네이버 AI 수장 등 유명 인사들이 참여
- 📜 [Anthropic] [The Claude 3 Model Family: Opus, Sonnet, Haiku](https://www-cdn.anthropic.com/de8ba9b01c9ab7cbabf5c33b80b7bbc618857627/Model_Card_Claude_3.pdf)
    - Anthropic에서 최근 출시한 Claude 3 모델 패밀리에 대한 model card. 주로 벤치마크 성능 평가 결과가 제시되어 있는 듯함
- 📜 [Microsoft] [Sora: A Review on Background, Technology, Limitations, and Opportunities of Large Vision Models](https://arxiv.org/abs/2402.17177v2)
    - OpenAI에서 출시한 text-to-video 생성 AI 모델, Sora에 대한 comprehensive review paper
- 📜 [Google Research] [Beyond Sparse Rewards: Enhancing Reinforcement Learning with Language Model Critique in Text Generation](https://arxiv.org/abs/2401.07382)
    - 기존에는 전체 output에 대한 single reward를 반환했기 때문에 reward signal 자체가 spare하다는 문제가 있었음 → LLM의 비판(critique) 능력을 활용하여 RL 학습 과정에서 사용될 수 있는 intermediate-step rewards를 생성
- 📜 [Birbal: An efficient 7B instruct-model fine-tuned with curated datasets](https://arxiv.org/abs/2403.02247)
    - NeurIPS workshop으로 진행된 LLM Efficiency Challenge. RTX 4090 또는 A00 with 40GB 한 대로 24시간 내에 학습하는 것을 목표로 함. 본 모델은 Mistral-7B를 베이스로 삼고 있으며 RTX 4090으로 16시간 동안 학습함. 이는 다양한 태스크를 아우르는 고품질 instruction dataset에서 기인함
- 📜 [Google DeepMind] [Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context](https://arxiv.org/abs/2403.05530)
    - context의 길이가 긴 상황에서, Gemini 1.5 모델 패밀리가 어떤 성능을 보여주는지 비교 분석한 구글의 technical report. MMLU에서 사람의 최고 점수를 넘은 최초의 모델이라고 주장하지만 대중의 평가는 상이함.
- 📜 [MuseGraph: Graph-oriented Instruction Tuning of Large Language Models for Generic Graph Mining](https://arxiv.org/abs/2403.04780)
    - task-specific Chain-of-Thought-based insturction generation mechanism
- 📜 [Harnessing Multi-Role Capabilities of Large Language Models for Open-Domain Question Answering](https://arxiv.org/abs/2403.05217)
    - ODQA 태스크에서 ‘retrieve-then-read’와 ‘generate-then-read’ 패러다임을 합친 방식. query expansion, document selection, answer generation의 세 가지 스텝으로 구성됨.
- 🧑🏻‍💻 [Cohere] [Command-R: Retrieval Augmented Generation at Production Scale](https://txt.cohere.com/command-r/)
    - long context를 활용하는 RAG나 외부 API, 또는 tool 사용에 적합한 생성형 모델 Command-R을 공개. Embed & Rerank 모델과 함께 사용할 수 있도록 설계됨. Cohere API를 통해 이용 가능.
- 📜 [MIT] [RA-ISF: Learning to Answer and Understand from Retrieval Augmentation via Iterative Self-Feedback](https://arxiv.org/abs/2403.06840)
    - query와 무관한 문서가 retrieve 되는 것을 방지하기 위해 Iterative Self-Feedback 방식을 제안
- 🧑🏻‍💻 [OpenAI] [transfromer-debugger (TBD)](https://github.com/openai/transformer-debugger)
    - Small Language Models의 특정 행동을 조사하기 위한 목적으로 제작된 디버깅 툴 (깃허브 레포 링크)
- 📜 [Google DeepMind, OpenAI] [Stealing Part of a Production Language Model](https://arxiv.org/abs/2403.06634)
    - proprietary 모델의 embedding projector layer를 hacking으로 얻을 수 있다는 화제의 논문
- 📜 [Meta] [Branch-Train-MiX: Mixing Expert LLMs into a Mixture-of-Experts LLM](https://arxiv.org/abs/2403.07816)
    - seed 모델로부터 각 데이터에 따라 다른 expert LLM을 학습시키고, router를 통해 추가적인 FeedForward layer를 학습시키는 방식인 Branch-Train-Mix를 제안. MoE finetuning이 필요하지 않은 Branch-Train-Merge 방식에도 적용 가능.
- 🧑🏻‍💻 [DeepLearning.AI] [Knowledge Graph for RAG](https://learn.deeplearning.ai/courses/knowledge-graphs-rag/lesson/1/introduction)
    - Neo4j와의 collaboration. RAG 내에서 knowledge graph를 사용하는 방법을 배우는 과정 (graph store)
- 🧑🏻‍💻 [Google DeepMind] [A generalist AI agent for 3D virtual environments](https://deepmind.google/discover/blog/sima-generalist-ai-agent-for-3d-virtual-environments/)
    - 다양한 video-game 환경에서 natural language instruction을 따를 수 있는 Multiworld Agent를 개발
- 🧑🏻‍💻 [Microsoft Research] [Rethinking Generative Large Language Model Evaluation for Semantic Comprehension](https://arxiv.org/abs/2403.07872)
    - 여러 선택지 중에서 하나를 고르는 Multiple Choice Question Answering (MCQA) 대신 24개의 모델이 참여하는 RWQ-Elo ranking system을 제안
- 🧑🏻‍💻 [OpenAI] [Figure Status Update - OpenAI Speech-to-Speech Reasoning](https://www.youtube.com/watch?v=Sq1QZB5baNw)
    - OpenAI에서 Figure라는 로봇 회사와 제품을 결합하여 인지 및 추론 능력이 아주 뛰어난 로봇을 개발
- 📜 [Tancent] [Large Language Models are Contrastive Reasoners](https://arxiv.org/abs/2403.08211)
    - “Let’s give a correct and a wrong answer”, prompt를 앞에 붙여줌. 이로써 LLM이 훌륭한 contrastive reasoner라는 것을 입증한 연구.
- 📜 [Logits of API-Protected LLMs Leak Proprietary Information](https://arxiv.org/abs/2403.09539)
    - proprietary 모델들의 hidden size, full-vocabulary output 등에 관한 정보를 적은 API 비용으로 hacking할 수 있다는 논문. gpt-3.5-turbo의 경우 $1000 이하가 필요하다고 주장.
- 📜 [Apple] [MM1: Methods, Analysis & Insights from Multimodal LLM Pre-training](https://arxiv.org/abs/2403.09611)
    - Multimodal Large Language Models에 관한 사전학습용 데이터 선정, 학습 기법, 이미지 인코더 등에 대한 연구. dense 모델과 mixture-of-experts (MoE) 방식을 결합한 MM1 모델 패밀리를 개발
- 🗞️ [Ex-Activision CEO Bobby Kotick pitched buying TikTok to potential partners, including Sam Altman: report](https://www.businessinsider.in/tech/news/ex-activision-ceo-bobby-kotick-pitched-buying-tiktok-to-potential-partners-including-sam-altman-report/articleshow/108409188.cms)
    - 미국에서는 틱톡을 규제하는 와중에 Activision의 전 CEO가 틱톡을 인수하고 OpenAI와 협력할 계획을 갖고 있음에 관한 보도
- 🧑🏻‍💻 [xAI] [Open Release of Grok-1](https://x.ai/blog/grok-os)
    - 일론 머스크의 AI 회사 xAI에서 LLM Grok-1 (314B)을 오픈 소스로 공개. 약속을 지키는 상남자.. OpenAI와의 관계에 기인한 현상같기도 하고.. ([깃허브 링크](https://github.com/xai-org/grok-1))
- 🧑🏻‍💻 [Cohere] [C4AI Command-R (HuggingFace)](https://huggingface.co/CohereForAI/c4ai-command-r-v01)
    - Cohere에서 공개한 RAG에 특화된 LLM. 지난 번 API로 공개한 이후 모델도 허깅페이스에 공개.
- 📜 [Stanford University] [Quiet-STaR: Language Models Can Teach Themselves to Think Before Speaking](https://arxiv.org/abs/2403.09629)
    - 언어 모델이 reasoning을 수행하는 과정에서, 매 스텝마다 ‘thought’를 병렬적으로 생성하여 더 좋은 추론이 가능하도록 유도하는 방법론을 제안
- 📜 [Peking University] [RAT: Retrieval Augmented Thoughts Elicit Context-Aware Reasoning in Long-Horizon Generation](https://arxiv.org/abs/2403.05313)
    - CoT 문장의 각 요소와 관련된 content를 찾아서 이를 바탕으로 필요한 경우 revise. revised 문장들로 CoT를 재구성
</details>

<details>
  <summary>4th week</summary>
  
- 🗞️ [Nvidia] [Nvidia reveals Blackwell B200 GPU, the ‘world’s most powerful chip’ for AI](https://www.theverge.com/2024/3/18/24105157/nvidia-blackwell-gpu-b200-ai)
    - H100의 뒤를 있는 플래그십 GPU, B200 공개
- 🧑🏻‍💻 [Open-Sora](https://github.com/hpcaitech/Open-Sora)
    - OpenAI의 Sora에 영감을 받아 만든 고품질 video 생성 모델. 오픈소스로 공개.
- 📜 [CMU-LTI] [Enhancing LLM Factual Accuracy with RAG to Counter Hallucinations: A Case Study on Domain-Specific Queries in Private Knowledge-Bases](https://arxiv.org/abs/2403.10446)
    - upstream datasets processing과 downstrea performance evaluation을 통합한 시스템을 구축. 데이터 크롤링부터 QA 시스템 전반에 대한 내용을 다루고 있음
- 📜 [UC Berkeley] [RAFT: Adapting Language Model to Domain Specific RAG](https://arxiv.org/abs/2403.10131)
    - Test 단계에서 모델이 외부 문서를 활용하는 방식에 대해 학습하도록 함. 이때 golden only 방식이 아닌 sampled negative documents도 활용.
- 📜 [Google Research] [PERL: Parameter Efficient Reinforcement Learning from Human Feedback](https://arxiv.org/abs/2403.10704)
    - RLHF에 LoRA를 활용하는 방법론을 제안. 정확히는 reward model 학습에 LoRA가 활용됨
- 📜 [EACL 2024] [Aligning Large and Small Language Models via Chain-of-Thought Reasoning](https://aclanthology.org/2024.eacl-long.109/)
    - SLM이 특정 양식을 잘 따를 수 있도록 Instruction-tuning-CoT Method를 제안
- 📜 [RankPrompt: Step-by-Step Comparisons Make Language Models Better Reasoners](https://arxiv.org/abs/2403.12373)
    - LLM이 reasoning 과정 중에 만드는 실수를 줄이기 위한 방식으로 LLM이 스스로 자신의 response에 대해 ranking 하는 방식을 제안. 추가적인 리소스 사용이 발생하지 않는다는 점이 특징.
- 📜 [KAIST] [SuRe: Summarizing Retrievals using Answer Candidates for Open-domain QA of LLMs](https://openreview.net/pdf?id=w4DW6qkRmt)
    - ODQA 태스크에서 retrieved passage를 바탕으로 ‘답변 후보 생성 - 조건부 요약 - 검증’ 과증을 거쳐 벤치마크 성능을 크게 끌어올린 LK Lab의 연구
- 📜 [Microsoft Corporation] [LLMLingua-2: Data Distillation for Efficient and Faithful Task-Agnostic Prompt Compression](https://arxiv.org/abs/2403.12968)
    - LLM으로부터 data distillation를 통해 압축된 텍스트를 획득하고 이에 대해 annotation을 수행한 뒤 필터링을 거쳐 나온 결과를 압축하여 모델에 프롬프트를 전달
- 🧑🏻‍💻 [Google DeepMind] [TacticAI: an AI assistant for football tactics](https://deepmind.google/discover/blog/tacticai-ai-assistant-for-football-tactics/)
    - 리버풀의 데이터를 활용해서 코너킥 결과를 예측하는 AI 모델을 개발. 이전에도 리버풀 데이터를 활용한 결과가 있었는데 후속작으로 나온 듯함.
- 📜 [Google DeepMind] [Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models](https://arxiv.org/abs/2310.06117) (ICLR’ 2024)
    - LLM이 주어진 문제로부터 high-level concept과 원칙들을 추출해내고 이를 바탕으로 reasoning 하는 Step-Back Prompting을 제안. 간단히 말하자면 Abstraction → Reasoning 과정을 거침.
- 📜 [AI2] [RewardBench: Evaluating Reward Models for Language Modeling](https://arxiv.org/abs/2403.13787)
    - RLHF에 가장 중요한 요소 중 하나인 Reward Model이 reward를 제대로 반환하고 있는지 확인할 수 있는 벤치마크를 개발하여 공개. prompt-win-lose trios 데이터셋.
- 📜 [LlamaFactory: Unified Efficient Fine-Tuning of 100+ Language Models](https://arxiv.org/abs/2403.13372)
    - 다양한 Efficient fine-tuning 기법들을 내장 web UI LlamaBoard를 통해 코딩할 필요 없이 간단하고 편리하게 적용할 수 있는 프레임워크를 소개
- 📜 [MathVerse: Does Your Multi-modal LLM Truly See the Diagrams in Visual Math Problems?](https://arxiv.org/abs/2403.14624)
    - 멀티모달 모델이 그림을 정확히 이해하고 문제를 푸는지 확인하기 위해 사람이 직접 annotation한 테스트 데이터 15K 개를 포함하는 MathVerse 벤치마크를 공개
- 📜 [KAIST] [Adaptive-RAG: Learning to Adapt Retrieval-Augmented Large Language Models through Question Complexity](https://arxiv.org/abs/2403.14403)
    - classifier (사이즈가 작은 LM)을 통해 query를 straightforward/simple/complex query로 구분하고 각각 다른 방식으로 retrieval을 수행
- 📜 [Sakana AI] [Evolutionary Optimization of Model Merging Recipes](https://arxiv.org/abs/2403.13187)
    - 모델 merge와 관련하여 선택된 모델들의 layer를 자동적으로 병합하는 방법을 제시함.
</details>

<details>
  <summary>5th week</summary>
  
- 📜 [Instructing Large Language Models to Identify and Ignore Irrelevant Conditions](https://arxiv.org/abs/2403.12744)
    - Math Word Problem (MWP)를 풀 때 자주 사용되는 CoT prompting에 대한 연구. I3C라는 방법론을 제시했는데, LLM으로 하여금 irrelevant conditions를 무시하도록 instruct하는 방식임. 이것이 RAG에도 적용될 수 있지 않을까 하는 생각이 듦.
- 📜 [Microsoft Research, CMU] [Can large language models explore in-context?](https://arxiv.org/abs/2403.15371)
    - GPT-3.5, GPT-4, Llama2를 대상으로 다양한 프롬프트를 디자인해서 실험을 수행. 결국 지금까지의 언어 모델들은 상당한 interventions(예를 들어 fine-tuning) 없이는 robust한 행동 양상을 보일 수 없다는 결론을 내림
- 🧑🏻‍💻 [Lightning AI] [lightning-thunder](https://github.com/Lightning-AI/lightning-thunder?tab=readme-ov-file)
    - 파이토치를 활용한 LLM 학습 속도를 40% 가량 향상시켜주는 compiler를 공개. single accelerator & multi-GPU 환경에서 모두 활용 가능.
- 📜 [Johns Hopkins, Yale, AI2] [FOLLOWIR: Evaluating and Teaching Information Retrieval Models to Follow Instructions](https://arxiv.org/abs/2403.15246)
    - Information Retrieval (IR) 에 LLM을 사용하더라도 지금까지는 단순히 query를 입력으로 받을 뿐이었음 → instruction following retrieval model, FollowIR을 제안
- 📜 [UC Berkeley] [LLM2LLM: Boosting LLMs with Novel Iterative Data Enhancement](https://arxiv.org/abs/2403.15042)
    - baseline student LLM을 초기 데이터셋에 대해 학습 → 학습 결과를 평가하여 잘못된 케이스들을 모음 → teacher LLM이 이를 바탕으로 합성 데이터를 생성하여 학습 데이터에 추가
- 📜 [Rutgers University] [AIOS: LLM Agent Operating System](https://arxiv.org/abs/2403.16971)
    - LLM agent를 operating system에 집어 넣어 OS의 뇌 역할을 수행하도록 함
- 📜 [MIT, Berkeley, Chicago, Texas] [Decoding Compressed Trust: Scrutinizing the Trustworthiness of Efficient LLMs Under Compression](https://arxiv.org/abs/2403.15447)
    - 3개의 LLM에 4개의 compression technique을 적용해 8개 차원으로 평가. 3-bit와 같은 low bit 수준의 quantization은 trustworthiness를 크게 하락시킴
- 🧑🏻‍💻 [OpenAI] [Sora: first impressions](https://openai.com/blog/sora-first-impressions)
    - 여러 아티스트들이 Sora을 이용해서 만든 동영상 결과물들을 OpenAI 블로그에 공개. 자연스러운 내용 전개같은 건 없지만 신비스러운 느낌을 주는 초고퀄리티의 영상들임.
</details>
