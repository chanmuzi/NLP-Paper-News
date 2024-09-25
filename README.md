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
- 🧑🏻‍💻 [Databricks] [Introducing DBRX: A New State-of-the-Art Open LLM](https://www.databricks.com/blog/introducing-dbrx-new-state-art-open-llm)
    - Grok-1의 40% 사이즈밖에 되지 않으면서도 LLaMA2-70B보다 추론도 두 배나 빠르고 GPT-3.5-turbo를 능가하며 Gemini Pro 1.0에 준하는 성능의 LLM, DBRX을 [허깅페이스에 공개](https://huggingface.co/spaces/databricks/dbrx-instruct)
    - MoE를 활용하여 132B/32B 전체/활성 파라미터 사이즈를 가짐. 32K context length 지원
- 🧑🏻‍💻 [Anthropic] [Claude-3-Opus vs GPT-4](https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard)
    - Chatbot Arena에서 GPT-4의 왕좌를 Claude가 탈환..!
- 📜 [Meta, MIT] [The Unreasonable Ineffectiveness of the Deeper Layers](https://arxiv.org/abs/2403.17887)
    - layer pruning이 다른 PEFT 전략을 보완/대체할 수 있는 방법론임을 확인함과 동시에, 현재의 사전학습 방식들은 deep layers에 속한 파라미터들을 온전히 활용하고 있지 못함을 입증한 연구
- 📜 [Univ. of Hong Kong] [Mini-Gemini: Mining the Potential of Multi-modality Vision Language Models](https://arxiv.org/abs/2403.18814)
    - visual token을 강화하기 위해 additional visual encoder를 사용. MoE를 활용하여 2B-34B 사이즈의 모델들을 지원
- 📜 [Meta, Mila, McGil, Montreal] [Improving Text-to-Image Consistency via Automatic Prompt Optimization](https://arxiv.org/abs/2403.17804)
    - text-to-image (T2I)에서의 성능을 향상시키기 위한 프레임워크로 T2I optimization-by-prompting (OPT2I)을 제시.
- 📜 [MIT, Microsoft] [Supervisory Prompt Training](https://arxiv.org/abs/2403.18051)
    - dual LLM system을 이용하여 prompt를 자동적으로 생성. 문장 수준에서의 효용성을 확인하기 위한 impact score 개념을 고안.
- 📜 [Upstage] [sDPO: Don't Use Your Data All at Once](https://arxiv.org/abs/2403.19270)
    - alignment tuning 단계에서 사용될 수 있는 stepwise DPO (sDPO)를 제안. 이용 가능한 선호 데이터셋을 분할하여 stepwise 방식으로 사용 (한꺼번에 사용하는 대신에)
- 🧑🏻‍💻 [HuggingFace] [A little guide to building Large Language Models in 2024](https://www.youtube.com/watch?v=2-SPH9hIKT8)
    - 허깅페이스 cofounder 중 한명이 직접 촬영하여 업로드한 LLM 기초 강의 (1시간 15분)
- 🧑🏻‍💻 [AI21labs] [Introducing Jamba: AI21's Groundbreaking SSM-Transformer Model](https://www.ai21.com/blog/announcing-jamba)
    - transformer 아키텍쳐와 structured State Space Model (SSM) 기술을 결합하여 더 높은 throughput을 가지면서도 좋은 성능을 가진 모델 (256K 윈도우 사이즈)
- 📜 [Can multiple-choice questions really be useful in detecting the abilities of LLMs?](https://arxiv.org/abs/2403.17752)
    - Multiple-choice question(MQA)가 LLM을 평가하는 데 적합하지 않은 방식임을 설명. 결과가 질문이 제시되는 순서에 큰 영향을 받는다는 점과 long-form generation(LFG)로 평가했을 때 결과와의 낮은 상관관계를 그 근거로 듦
- 📜 [Understanding Emergent Abilities of Language Models from the Loss Perspective](https://arxiv.org/abs/2403.15796)
    - LLM에서의 emergent ability를 모델 사이즈 대신 로스 기준으로 분석. 동일한 사전 학습 loss를 갖는 경우, 모델의 사이즈가 크더라도 동일한 퍼포먼스를 낸다는 결과를 제시
</details>


## 🌸 April
<details>
  <summary>1st week</summary>

- 🧑🏻‍💻 [Anthropic] [Prompt library](https://docs.anthropic.com/claude/prompt-library)
    - 각종 상황에 적합한 프롬프트들을 검색할 수 있는 프롬프트 라이브러리
- 🧑🏻‍💻 [xAI] [Announcing Grok-1.5](https://x.ai/blog/grok-1.5)
    - 128K 토큰을 컨텍스트로 갖는 신모델. X에서 일부 유저들에게 선공개될 예정
- 📜 [Can LLMs Learn from Previous Mistakes? Investigating LLMs' Errors to Boost for Reasoning](https://arxiv.org/abs/2403.20046)
    - LLM이 잘못된 내용들로부터 얻는 이득이 있는지를 확인하기 위해 관련 데이터셋을 직접 제작하여 실험한 결과를 제시
- 📜 [Meta] [The Unreasonable Ineffectiveness of the Deeper Layers](https://arxiv.org/abs/2403.17887v1)
    - single A100 gpu에서 돌릴 수 있도록 PEFT를 이용하여 QA 벤치마크 검증. LLaMA 패밀리의 경우 40%의 레이어를 삭제해도 기존의 accuracy를 유지할 수 있다는 결과.
- 🧑🏻‍💻 [OpenAI] [Navigating the Challenges and Opportunities of Synthetic Voices](https://openai.com/blog/navigating-the-challenges-and-opportunities-of-synthetic-voices)
    - 15초짜리 reference만 있으면 동일한 목소리로 다른 문장을 읽는 보이스를 생성할 수 있는 모델. 악용 가능성 때문에 공개하지는 않음
- 📜 [AI21labs] [Jamba: A Hybrid Transformer-Mamba Language Model](https://arxiv.org/abs/2403.19887)
    - transformer 아키텍쳐와 structured State Space Model (SSM) 기술을 결합하여 더 높은 throughput을 가지면서도 좋은 성능을 가진 모델 (256K 윈도우 사이즈)
- 📜 [Google DeepMind] [Gecko: Versatile Text Embeddings Distilled from Large Language Models](https://arxiv.org/abs/2403.20327)
    - LLM의 지식을 retriever 모델에 distill 했다는 컨셉을 지닌 embedding 모델. MTEB 벤치마크에서 256 임베딩 차원으로 768 차원의 모델 성능을 넘어섰음
- 📜 [Apple] [ReALM: Reference Resolution As Language Modeling](https://arxiv.org/abs/2403.20329)
    - LLM을 다양한 종류의 reference를 resolve 하는 데 사용 → 시리가 이제 유저의 화면을 인식하고 질의에 응답 가능
- 🗞️ [Microsoft and OpenAI pledge $100 billion for ‘Stargate’ supercomputer facility](https://interestingengineering.com/culture/microsoft-and-openai-want-to-build-a-100-billion-datacenter)
    - MS와 OpenAI가 슈퍼컴퓨터와 데이터센터 구축에 2028년까지 1000억 달러(130조 원)을 들일 예정
- 📜 [Microsoft] [Injecting New Knowledge into Large Language Models via Supervised Fine-Tuning](https://arxiv.org/abs/2404.00213)
    - GPT-4를 대상으로 직접 구축한 데이터셋에 대해 SFT를 수행한 결과, LLM response의 factuality를 높일 수 있다는 것을 입증. 이때 사용된 ‘dataset generation strategies’가 핵심.
- 📜 [Naver Cloud] [HyperCLOVA X Technical Report](https://arxiv.org/abs/2404.01954)
    - 한국어, 영어, 코드 데이터를 적절히 혼합하여 학습한 HyperCLOVA X 모델의 technical report를 공개. 한국어와 한국의 문화적 뉘앙스에 대한 이해도가 높은 것으로 확인됨
- 📜 [Anthropic] [Many-shot jailbreaking](https://www.anthropic.com/research/many-shot-jailbreaking)
    - Anthropic 뿐만 아니라 타사의 LLM에도 적용 가능한 jailbreaking을 연구한 결과를 공개. 간단하면서도 효과적인 attack에 대해 연구.
- 📜 [Efficient Prompting Methods for Large Language Models: A Survey](https://arxiv.org/abs/2404.01077)
    - 프롬프트를 압축하는 등의 computation 관련 연구와 최적의 프롬프트를 찾는 optimization 관련 연구를 중심으로 한 짧은 서베이 페이퍼
- 📜 [Beyond Accuracy: Evaluating the Reasoning Behavior of Large Language Models -- A Survey](https://arxiv.org/abs/2404.01869)
    - 표면적인 정확도를 기준으로 LLM의 추론 능력을 평가가 이뤄졌었던 것을 문제점으로 지적. 사람과 LLM의 추론 방식 간의 차이를 설명한 짧은 서베이 페이퍼.
- 📜 [University of Waterloo, CMU] [Long-context LLMs Struggle with Long In-context Learning](https://arxiv.org/abs/2404.02060)
    - perplexity나 합성 태스크 정도로는 long sequence를 다루는 LLM의 능력을 제대로 평가할 수 없음. 이러한 문제를 해결하기 위해 LongICLBench를 제시. 모든 모델들이 ‘엄청 긴’ 텍스트는 전혀 다루지 못한다는 것을 확인.
- 📜 [Tsinghua University, UIUC] [Advancing LLM Reasoning Generalists with Preference Trees](https://arxiv.org/abs/2404.02078)
    - Mistral-7B와 CodeLlama-70B에 fine-tuning된 reasoning 최적화 LLM, EURUS를 공개. 이는 large-scale & high quality의 alignment 데이터셋 UltraInteract를 구축함에 기인.
- 📜 [Google DeepMind] [Mixture-of-Depths: Dynamically allocating compute in transformer-based language models](https://arxiv.org/abs/2404.02258)
    - transformer 기반의 모델들은 기존에 입력 시퀀스 전체에 걸쳐 FLOPs을 균등하게 분배 → 이를 모델 depth에 따라 dynamic하게 할당함으로써 최적화. top-k routing 메커니즘을 이용.
- 🗞️ [DALL-E now lets you edit images in ChatGPT](https://www.theverge.com/2024/4/3/24120181/openai-dall-e-chat-gpt-image-edit)
    - ChatGPT에서 DALLE로 생성한 이미지의 영역을 지정하여 부분 수정이 가능해짐 (GPTs 사용)
- 🧑🏻‍💻 [Anthropic] [Claude can now use tools](https://docs.anthropic.com/claude/docs/tool-use)
    - Claude에서 tool use 기능을 beta로 공개. 자세한 내용은 API doucment를 참고.
- 📜 [Google DeepMind, Anthropic] [Training LLMs over Neurally Compressed Text](https://arxiv.org/abs/2404.03626)
    - LLM이 학습할 text를 압축할 때, 텍스트를 여러 segment로 쪼개고 동일한 길이의 bit로 만드는 방식인 Equal-Info Windows를 제안
</details>

<details>
  <summary>2nd week</summary>

- 🧑🏻‍💻 [Stability AI] [Introducing Stable Audio 2.0](https://stability.ai/news/stable-audio-2-0)
    - text-to-audio 뿐만 아니라 audio-to-audio 도 가능. 즉, audio로 새로운 audio를 생성하는 기능을 지원. 이 모델은 Diffusion Transformer (DiT) 아키텍쳐를 따르고 있음
- 🧑🏻‍💻 [MyShell, MIT-IBM, Princeton, Lepton AI] [JetMoE: Reaching LLaMA2 Performance with 0.1M Dollars](https://research.myshell.ai/jetmoe)
    - 약 1억 3천 만원 정도의 비용으로 LLaMA2를 상회하는 능력의 모델 JetMoE를 학습했다고 밝힘. publicly 이용 가능한 데이터만으로 학습된 모델이라는 점을 강조. 향후 technical report 공개 예정 (아직 x)
- 📜 [University of Copenhagen, Google DeepMind] [MuLan: A Study of Fact Mutability in Language Models](https://arxiv.org/abs/2404.03036)
    - 시간과 같은 contingency에 따라 정보가 mutable(변경될수도) 있다. mutable facts는 그렇지 않은 것과 다른 방식으로 인코딩되어 업데이트하기 더 쉬울 것이라는 가설 → 1:1, 1:N 관계에 대한 분석
- 📜 [Stanford, MIT] [Stream of Search (SoS): Learning to Search in Language](https://arxiv.org/abs/2404.03683)
    - 문제를 풀기 위해 search가 필요한 데이터셋에 대해 transformer 기반의 모델을 from scratch 학습한 모델
- 📜 [Stanford, Georgia] [Social Skill Training with Large Language Models](https://arxiv.org/abs/2404.04204)
    - 사람이 social skills에 의존하는 것처럼 LLM도 이러한 메커니즘을 활용할 수 있도록 하는 프레임워크, APAM(AI Partner, AI Mentor)를 제시
- 📜 [Microsoft Research] [Models to Self-Improve with General Preferences](https://arxiv.org/abs/2404.03715)
    - Preference를 최적화하기 위해 contrastive learning의 단순함과 안전성을 theoretical generality와 결합한 Direct Nash Optimization(DNO)를 제시. 작은 사이즈(Orca-2 7B) 모델을 GPT-4와 AlpacaEval로 테스트했을 때 큰 성과 향상이 있었음
- 🧑🏻‍💻 [W&B] [Weight & Biases Docs](https://docs.wandb.ai/ko/?mkt_tok=MjYxLVFIUC04MjIAAAGSX8W79t-qKeYqkWAB6xTAK2R-027DfjjyAUi4hj32ywDET-u3DS8zoc8EGTXUmD6FeRTJjKotiQYg8qjBWT3683U-z133NpaQSmQJ8gRp)
    - W&B의 document가 한글판으로 공식 배포됨
- 🧑🏻‍💻 [Tesla] [Robotaxi](https://twitter.com/elonmusk/status/1776351450542768368)
    - 일론 머스크가 X에 Tesla의 Robotaxi가 8월 8일 출시될 예정임을 알림
- 🧑🏻‍💻 [Andrej Karpathy] [llm.c](https://github.com/karpathy/llm.c)
    - GPT-2 모델 학습 코드 작성에 pytorch를 사용하지 않고 오직 c만 사용함. 1,000여 줄의 코드로 GPT-2의 학습 과정을 파악할 수 있음.
- 🧑🏻‍💻 [3Blue1Brown] [Attention in transformers, visually explained](https://www.youtube.com/watch?v=eMlx5fFNoYc&t=27s)
    - 지난 번 Transformer 시각화 영상 이후 후속 영상 업로드
- 📜 [Mila, McGil] [LLM2Vec: Large Language Models Are Secretly Powerful Text Encoders](https://arxiv.org/abs/2404.05961)
    - decoder-only LLM에 1) bidiriectional attention, 2) masked token next prediction, 3) unsupervised contrastive learning을 적용하여 기존의 encoder 모델들보다 훨씬 뛰어난 MTEB 벤치마크 결과를 달성함
- 📜 [Google] [Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention](https://arxiv.org/abs/2404.07143)
    - 압축적인 정보를 vanilla attention mechanism에 넣고, single Transformer 블록 내에서 masked local attention과 long-term linear attention 메커니즘을 구현하는 방식, Infini-attention을 제안. 이를 통해 LLM이 long context 태스크를 잘 수행할 수 있게 됨
- 📜 [NVIDIA] [RULER: What's the Real Context Size of Your Long-Context Language Models?](https://arxiv.org/abs/2404.06654)
    - Needle-In-A-Haystack (NIAH) 태스크에 multi-hop tracing과 aggregation 카테고리를 새로이 추가한 synthetic benchmark, Ruler를 공개
- 📜 [UIUC] [Graph Chain-of-Thought: Augmenting Large Language Models by Reasoning on Graphs](https://arxiv.org/abs/2404.07103)
    - 대부분의 도메인에서 텍스트는 상호 관계를 갖는다는 점에 근거하여 Graph Reasoning Benchmark (GRBench)를 직접 제작. 10개의 도메인에서 1,740개 QA를 다룸.
- 📜 [Apple] [Superposition Prompting: Improving and Accelerating Retrieval-Augmented Generation](https://arxiv.org/abs/2404.06910)
    - 사전학습된 트랜스포머 기반의 모델에 fine-tuning 없이 바로 적용 가능한 RAG prompting methodology, superposition prompting을 제안. 입력 문서를 parallel한 방식으로 처리하며 불필요한 것을 버리도록 함.
- 📜 [Tsinghua, Microsoft] [Rho-1: Not All Tokens Are What You Need](https://arxiv.org/abs/2404.07965)
    - 모든 토큰이 동일한 중요도를 갖지 않으므로, 사전학습 단계에서 reference 모델을 사용하여 중요도가 높은 토큰에 대해 focused loss를 적용하는 방식인 Selective Language Modeling (SLM)을 제안. 이 방식으로 학습된 LLM이 Rho-1 모델.
- 📜 [Google DeepMind] [RecurrentGemma: Moving Past Transformers for Efficient Open Language Models](https://arxiv.org/abs/2404.07839)
    - Griffin 모델의 아키텍쳐를 기반으로 linear recurrence에 local attention을 결합하여 학습한 모델 RecurrentGemma를 공개. 2B non-embedding parameters 버전의 모델과 instruction tuned 버전을 제공
- 🧑🏻‍💻 [IBM] [IBM watsonx chat](https://dataplatform.cloud.ibm.com/chat/login?redirect_url=%2Fchat%2F)
    - IBM [watsonx.ai](http://watsonx.ai) studio에서 사용 가능한 LLM 챗 모델을 공개. granite-13b-chat-v2, llama-2-13-chat, llama-2-70b-chat, 세 종류의 버전을 공개함.
</details>

<details>
  <summary>3rd week</summary>
  
- 🧑🏻‍💻 [Mistral] [Mixtral-8x22B-v0.1-4bit](https://huggingface.co/mistral-community/Mixtral-8x22B-v0.1-4bit)
    - 176B 파라미터, 44B active 파라미터 (추론 시), 65K context window, 8 experts & 2 per token, 32K vocab
- 🧑🏻‍💻 [xAI] [Grok-1.5 Vision Preview](https://x.ai/blog/grok-1.5v)
    - xAI에서 공개한 첫 번째 멀티모달 모델. zero-shot 기준으로 GPT-4V에 필적하거나 그 이상의 성능을 보여주는 벤치마크 결과도 존재.
- 📜 [Google] [CodeGemma: Open Code Models Based on Gemma](https://storage.googleapis.com/deepmind-media/gemma/codegemma_report.pdf)
    - RecurrentGemma와 함께 공개한 코드 데이터를 학습한 Gemma 모델. 7B pretrained (PT) 버전과 instruction-tuned (IT) 버전 두 개를 공개.
- 🗞️ [Meta is testing an AI-powered search bar in Instagram](https://techcrunch.com/2024/04/12/meta-is-testing-an-ai-powered-search-bar-in-instagram/)
    - 인스타그램에서 릴스, 포스트를 검색하거나 질문을 할 때 사용할 수 있는 AI 기능 도입을 테스트 중이라고 알려짐
- 🧑🏻‍💻 [DeepLearning.AI] [Quantization Fundamentals with HuggingFace](https://www.deeplearning.ai/short-courses/quantization-fundamentals-with-hugging-face/)
    - Quanto 라이브러리를 활용한 linear quantization, linear quantization이 실행되는 전반적인 흐름, Transformer 라이브러리를 활용하여 quantization의 다른 형태인 downcasting 적용해보기
- 📜 [Sample-Efficient Human Evaluation of Large Language Models via Maximum Discrepancy Competition](https://arxiv.org/abs/2404.08008)
    - LLM에 대한 사람의 평가가 좀 더 쉽고 간편해질 수 있도록 MAximum Discrepeancy (MAD) competition을 도입. instruction의 subset을 sampling하고 두 개의 LLM에 adapt하여 얻은 결과에 대해 win, tie, lose 셋 중 하나를 고르도록 하는 방식
- 📜 [Tinkoff] [Learn Your Reference Model for Real Good Alignment](https://arxiv.org/abs/2404.09656)
    - 학습 중에 reference policy를 업데이트하는 Trust Region DPO (TR-DPO) 방식을 제안
- 📜 [Google] [TransformerFAM: Feedback attention is working memory](https://arxiv.org/abs/2404.09173)
    - feedback loop를 이용하여 네트워크가 스스로의 latent representation에 attend 할 수 있도록 만든 Feedback Attention Memory(FAM)를 제안. 이론상 unlimited length의 sequence를 처리할 수 있도록 함
- 📜 [Meta, CMU] [Megalodon: Efficient LLM Pretraining and Inference with Unlimited Context Length](https://arxiv.org/abs/2404.08801)
    - exponential moving average with gated attention을 사용하는 Mega 아키텍쳐에, complex exponential moving average (CEMA), timestep normalization layer, normalized attention mechanism, pre-norm with two-hop residual configuration을 더한 모델인 Megalodon 모델을 공개
- 🗞️ [Google] [Gemma-1.1 version released](https://huggingface.co/google/gemma-1.1-7b-it)
    - was trained using a novel RLHF method
- 📜 [Cambridge, Michigan, Oxford, Stanford, etc] [Foundational Challenges in Assuring Alignment and Safety of Large Language Models](https://arxiv.org/abs/2404.09932)
    - LLM을 alignment 하거나 safety를 보장함에 있어서 18개의 근본적인 문제점을 다루는 서베이 페이퍼
- 📜 [UT Austin] [Pre-training Small Base LMs with Fewer Tokens](https://arxiv.org/abs/2404.08634)
    - 큰 언어 모델에서 transformer 블록을 가져와 raw pretraining data의 일부에 추가 학습하는 방식을 제안. 이를 통해 적은 자원으로 작은 모델을 학습시켜 준수한 성능을 낼 수 있음
- 📜 [KAIST] [Self-Explore to Avoid the Pit: Improving the Reasoning Capabilities of Language Models with Fine-grained Rewards](https://arxiv.org/abs/2404.10346)
    - LLM이 스스로 reasoning 능력을 향상시킬 수 있도록, LLM에게 잘못된 스텝(first pit)을 제공하고 이를 개선하기 위한 fine-grained rewards를 사용하는 방식인 Self-Explore를 제안
- 🧑🏻‍💻 [Upstage] [Evalverse: Revolutionizing Large Language Model Evaluation with a Unified, User-Friendly Framework](https://www.upstage.ai/feed/tech/evalverse-llm-evaluation-opensource)
    - 서브모듈을 통한 통합 평가, slack을 통한 코드 없는 평가 요청, LLM 평가 보고서 제작 기능
- 🧑🏻‍💻 [Microsoft] [VASA-1: Lifelike Audio-Driven Talking FacesGenerated in Real Time](https://www.microsoft.com/en-us/research/project/vasa-1/)
    - Single image + Audio clip (1분) + (optional) Control signals를 입력으로 받아 1분 길이의 고퀄리티 딥페이크 영상을 생성. 엄청나게 자연스러운 입모양과 표정.. 다양한 데모 영상이 업로드되어 있음
- 🧑🏻‍💻 [Meta] [Build the future of AI with Meta Llama 3](https://llama.meta.com/llama3/)
    - 8B, 70B 사이즈의 pretrained & instruction-tuned version의 Llama 3 모델을 공개. 70B 모델의 경우 Gemini Pro 1.5와 Claude 3 Sonnet의 성능을 상회하는 수준이라고 함.
- 🧑🏻‍💻 [Google] [Tune in for Google I/O](https://io.google/2024/)
    - 2024년 구글 I/O가 25일 뒤 열릴 예정. 사전 등록을 받고 있음
- 🧑🏻‍💻 [AI2] [OLMo 1.7–7B: A 24 point improvement on MMLU](https://blog.allenai.org/olmo-1-7-7b-a-24-point-improvement-on-mmlu-92b43f7d269d)
    - OLMo 1.0의 업그레이드 버전 모델을 공개. MMLU에서는 Llama 2-7B을 넘어서고 Llama 2-13B에 준하는 성능을, GSM8K에서는 Llama 2-13B을 넘어서는 성능을 보였다고 설명함. [허깅페이스 모델 카드](https://huggingface.co/allenai/OLMo-1.7-7B)
- 🧑🏻‍💻 [PyTorch] [torchtune](https://github.com/pytorch/torchtune)
    - PyTorch의 native 라이브러리로, LLM fine-tuning 및 실험을 편리하게 도와줌. 현재 Llama3 모델도 지원함.
- 📜 [Google DeepMind] [Many-Shot In-Context Learning](https://arxiv.org/abs/2404.11018)
    - human rationale을 model이 생성한 CoT rationale로 대체하는 Reinforced ICL, prompt에서 rationale을 완전히 지우고 domain-specific input만 활용하도록 하는 Unsupervised ICL, 두 방법론을 제안
- 📜 [Microsoft Research] [Position Engineering: Boosting Large Language Models through Positional Information Manipulation](https://arxiv.org/abs/2404.11216)
    - prompt engineering과 달리 프롬프트 내 텍스트를 변경하지 않고 순서 정보만 변경하는 방식인 position engineering을 제시
- 📜 [Tencent AI] [Toward Self-Improvement of LLMs via Imagination, Searching, and Criticizing](https://arxiv.org/abs/2404.12253)
    - Monte Carlo Tree Search(MCTS)를 LLM과 결합하여 self-improving loop를 구축한 AlphaLLM을 공개. Imagination, Searching, Criticizing, 세 단계로 loop가 구성됨
- 🗞️ [Meta adds its AI chatbot, powered by Llama 3, to the search bar across its apps](https://techcrunch.com/2024/04/18/meta-adds-its-ai-chatbot-powered-by-llama-3-to-the-search-bar-across-its-apps/?utm_source=www.theaivalley.com&utm_medium=newsletter&utm_campaign=meta-ai-vs-chatgpt-begins-now)
    - 메타가 네 개의 주요 앱(Facebook, Messenger, Instagram, WhatsApp)의 검색 창에 Llama 3 기반 챗봇 모델을 탑재함. 이를 OpenAI와의 경쟁 구도로 해석하는 듯함.
- 📜 [CMU, Meta AI] [TriForce: Lossless Acceleration of Long Sequence Generation with Hierarchical Speculative Decoding](https://arxiv.org/abs/2404.11912)
    - auto-regressive LLM이 모든 KV cache를 한 번에 load해야 한다는 문제를 해결하기 위해, dynamic sparse KV cache를 retrieve하는 방식을 고안.
- 🧑🏻‍💻 [OpenAI] [Introducing OpenAI Japan](https://openai.com/blog/introducing-openai-japan)
    - 일본어에 특화된 GPT-4 커스텀 모델을 공개. 아시아 내 최초 지사로 도쿄 지역을 선택.
</details>

<details>
  <summary>4th week</summary>

- 🧑🏻‍💻 [HuggingFace] [FineWeb](https://huggingface.co/datasets/HuggingFaceFW/fineweb)
    - 허깅페이스에서 오픈소스로 공개한 15T 개 토큰으로 구성된 텍스트 데이터셋. ODC-By 1.0 license의 저작권(상업적으로도 자유롭게 이용 가능). 45TB 의 저장 공간을 필요로 하며 223억행으로 구성됨..
- 📜 [Epoch AI] [Chinchilla Scaling: A replication attempt](https://arxiv.org/abs/2404.10102)
    - Chinchilla에서 밝혔던 scaling law가 타당한 것인지 실험을 통해 재현한 논문. 당시 제안되었던 세 개의 방법론 중 두 개는 유효하지 않으며 세 번째 방법론은 타당한 것으로 확인되었다고 주장함
- 📜 [State Space Model for New-Generation Network Alternative to Transformers: A Survey](https://arxiv.org/abs/2404.09516)
    - State Space Model (SSM) 서베이 페이퍼
- 📜 [Stanford] [How faithful are RAG models? Quantifying the tug-of-war between RAG and LLMs' internal prior](https://arxiv.org/abs/2404.10198)
    - LLM의 internal knowledge와 retrieved information 간의 관계에 대한 연구. LLM이 낮은 사전확률을 갖는 internal knowledge에 대해서 retrieved information에 perturbation(modification)을 가하는 경우 더 쉽게 영향을 받음을 확인 (반대는 영향을 덜 받음, robust)
- 📜 [Stanford] [2024 AI Index Report](https://aiindex.stanford.edu/report/)
    - 500페이지 분량에 달하는 스탠포드 AI 보고서. 스탠포드가 꼽은 주목해야 할 50개 모델 중 한국어 모델은 없다고 한다.
- 📜 [Fudan University] [AutoCrawler: A Progressive Understanding Web Agent for Web Crawler Generation](https://arxiv.org/abs/2404.12753)
    - LLM을 크롤러와 결합하여 크롤러가 다양하면서도 변화하고 있는 웹 환경을 잘 다룰 수 있도록 돕는 AutoCrawler를 제안. HTML의 hierarchical 구조를 활용한 two-stage 프레임워크
- 📜 [Towards Logically Consistent Language Models via Probabilistic Reasoning](https://arxiv.org/abs/2404.12843)
    - LLM을 facts와 rule 형태의 외부 지식에 consistent할 수 있도록 가르치는 fine-tuning 기법. 저자들이 고안한 loss를 제한된 양의 fact 학습에 사용함으로써 extrapolate 능력을 향상. ICLR 2024 Workshop paper.
- 📜 [Nanyang Technological University] [Relevant or Random: Can LLMs Truly Perform Analogical Reasoning?](https://arxiv.org/abs/2404.12728)
    - LLM에게 analogical reasoning 능력이 존재하는지 확인하는 연구. 무관한 예시로부터 관련 있는 예시를 LLM이 스스로 떠올리고 활용하는 self-generated 방식을 이용하면 실제로 추론 정확도가 향상되는 결과를 얻을 수 있음.
- 🧑🏻‍💻 [DeepLearning.AI] [Getting Started with Mistral](https://www.deeplearning.ai/short-courses/getting-started-with-mistral/)
    - API를 이용하여 Mistral 모델에 접근하고 프롬프팅 하는 방법, Mistral의 native function calling, RAG 시스템 구축, chat interface 구축 등에 대한 short course
- 🧑🏻‍💻 <Cookbook> [Efficiently fine-tune Llama 3 with PyTorch FSDP and Q-Lora](https://www.philschmid.de/fsdp-qlora-llama3)
    - FSDP와 Q-LoRA를 활용하여 Llama 3를 효율적으로 fine-tuning하는 방법을 알려주는 튜토리얼. 짧고 간결하게 작성되어 있음
- 📜 [Microsoft] [Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone](https://arxiv.org/abs/2404.14219)
    - 3.8B 사이즈의 phi-3-mini 모델을 공개. 작은 사이즈임에도 불구하고 Mixtral 8x7B, GPT-3.5에 준하는 성능을 보임. 이는 phi-2를 학습할 때 사용했던 데이터셋의 scaled-up version을 사용한 덕분임. 또한 phi-3-small (7B), phi-3-medium (14B)를 공개.
- 🧑🏻‍💻 [Adobe] [Generative AI in Premiere Pro powered by Adobe Firefly | Adobe Video](https://www.youtube.com/watch?v=6de4akFiNYM)
    - 프리미어 프로에 사용될 AI 기술을 선보임. 일부 영역을 드래그 한 뒤 자연어로 영상 일부를 편집하는 등의 작업이 가능
- 📜 [OpenAI] [The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions](https://arxiv.org/abs/2404.13208)
    - instruction hierarchy라는 개념을 도입하여 모델이 instruction 사이에 우선순위를 인식하도록 함. 이를테면 유저의 query보다는 system message를 우선 따르도록 학습시키는 것.
- 📜 [CMU] [TREACLE: Thrifty Reasoning via Context-Aware LLM and Prompt Selection](https://arxiv.org/abs/2404.13082)
    - 강화학습에서 유저의 재정적 상황과 latency 제약을 고려하여 모델과 프롬프트를 선정하는 policy를 학습시키는 TREACLE (Thrify Reasoning via Context-Aware LLM and Prompt Selection)을 제안
- 📜 [Zhejiang University] [Information Re-Organization Improves Reasoning in Large Language Models](https://arxiv.org/abs/2404.13985)
    - context를 그대로 사용하게 되면 피상적인 이해를 바탕으로 reasoning을 수행하게 됨 → 이를 해결하기 위해 context 정보를 re-organization 하는 InfoRE 메서드를 제안.
- 🧑🏻‍💻 [vals.ai] [Benchmarks for Industry](https://www.vals.ai/)
    - LegalBench, ContractLaw, TaxEval, CorpFin 벤치마크의 리더보드를 운영. 정확도, cost, latency를 비교
- 📜 [Achieving >97% on GSM8K: Deeply Understanding the Problems Makes LLMs Perfect Reasoners](https://arxiv.org/abs/2404.14963)
    - Deeply Understanding the Problems (DUP) prompting을 제안. 핵심 질문을 추출하고, 핵심 질문에 근거한 problem-solving information을 찾아낸 뒤, 이를 바탕으로 답변을 생성하도록 함
- 📜 [Tsinghua University] [Multi-Head Mixture-of-Experts](https://arxiv.org/pdf/2404.15045)
    - 각 토큰을 여러 개의 sub-tokens으로 나누는 multi-head 메커니즘을 이용. 이 sub-tokens는 다양한 experts set에 의해 병렬적으로 처리됨
- 📜 [Apple] [OpenELM: An Efficient Language Model Family with Open-source Training and Inference Framework](https://arxiv.org/pdf/2404.14619)
    - layer-wise scaling을 적용하여 정확도 향상을 이끌어낸 OpenELM을 공개. training, evaluation 프레임워크, publicly available datasets, pre-training configuration 등을 온전히 공개.
- 🗞️ [The Ray-Ban Meta Smart Glasses have multimodal AI now](https://www.theverge.com/2024/4/23/24138090/ray-ban-meta-smart-glasses-ai-wearables)
    - 메타가 Rayban glasses에 언어 번역, 사물 인식, 사진 캡쳐 등의 멀티모탈 AI의 능력을 탑재할 것임을 발표
- 📜 [Adobe] [Beyond Chain-of-Thought: A Survey of Chain-of-X Paradigms for LLMs](https://arxiv.org/abs/2404.15676)
    - Chain-of-X(CoX)에 관한 다양한 연구들을 정리한 survey paper. 8 페이지 분량의 짧은 서베이.
- 📜 [Microsoft] [Towards Systematic Evaluation of Logical Reasoning Ability of Large Language Models](https://arxiv.org/abs/2404.15522)
    - LLM의 logical reasoning 능력을 평가하는 벤치마크들은 일부 inference rules(긍정 논법, 대우 등)에 집중할 뿐임 → 25개의 reasoning pattern을 아우르는 벤치마크, LogicBench를 공개
- 📜 [Meta] [LayerSkip: Enabling Early Exit Inference and Self-Speculative Decoding](https://arxiv.org/abs/2404.16710)
    - 학습 동안 layer dropout을 적용. 이때 earlier layers는 낮은 비율, later layers에 대해 높은 비율을 적용. 또한 early exit loss를 사용. decoding 단계에서는 early layers에서 exit 후 남은 layer를 verify and correct하는 self-speculative decoding을 도입.
- 🧑🏻‍💻 [PyTorch] [PyTorch 2.3 Release Blog](https://pytorch.org/blog/pytorch2-3/)
    - torch.compile에서 유저가 정의하는 triton kernel을 지원하여 성능을 향상. tensor parallelism을 지원하여 1.6배 빠른 행렬 연산이 가능.
- 🧑🏻‍💻 [Snowflake] [snowflake-arctic-instruct](https://huggingface.co/Snowflake/snowflake-arctic-instruct)
    - 128개의 experts를 포함하는 Dense-MoE Hybrid 아키텍쳐를 활용한 480B 사이즈의 LLM을 공개. 17B active parameters가 특징.
- 📜 [Peking, Microsoft] [Make Your LLM Fully Utilize the Context](https://arxiv.org/abs/2404.16811)
    - long-context를 잘 처리할 수 있도록 INformation-INtensive (IN2) training을 적용. long context 내의 short segment에 대한 fine-grained information awareness와 여러 segments의 intergration을 요하는 태스크로 학습.
- 🗞️ [China Unveils Vidu: A Powerful Text-to-Video Generator](https://www.maginative.com/article/china-unveils-vidu-a-powerful-text-to-video-generator/)
    - 중국의 Shengshu Technology와 Tsinghua University에서 Sora에 버금가는 text-to-video 모델, Vidu를 공개
</details>


## 🏕️ May
<details>
  <summary>1st week</summary>
  
- 📜 [UIUC, Cohere, Princeton] [SnapKV: LLM Knows What You are Looking for Before Generation](https://arxiv.org/abs/2404.14469)
    - input 길이에 비례하여 증가하는 Key-Value (KV) cache 사이즈에 관련된 문제를 해결하기 위해 SnapKV를 제안. 각 attention head에 존재하는 중요한 KV positions를 선별함으로써 KV cache를 자동적으로 compress.
- 📜 [Meta] [AdvPrompter: Fast Adaptive Adversarial Prompting for LLMs](https://arxiv.org/abs/2404.16873)
    - adversarial prompt를 자동적으로 생성해주는 것은 그 자체로 의미가 없고 학습이 되어야 함. 이를 위한 target llm, AdvPrompter를 제시. AdvPrompter의 예측 결과 최적화 및 low-rank fine-tuning.
- 🧑🏻‍💻 [DeepLearning.AI] [Prompt Engineering for Vision Models](https://www.deeplearning.ai/short-courses/prompt-engineering-for-vision-models/)
    - text와 좌표, bounding box를 입력으로 받는 모델을 학습하는 방법, diffusion model 등의 이미지 컨트롤 방법 등에 대해 학습하는 1시간 분량의 short course
- 🧑🏻‍💻 [MIT, MyShell] [OpenVoice](https://github.com/myshell-ai/OpenVoice)
    - 짧은 오디오 샘플로부터 목소리를 복사하여 아주 현실적인 speech를 생성할 수 있는 OpenVoice V2를 공개
- 📜 [Cohere] [Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models](https://arxiv.org/abs/2404.18796)
    - GPT-4와 같은 한 개의 LLM을 평가자로 활용하는 것보다 여러 개의 작은 모델들을 사용하는 것이 더 좋은 평가 결과로 이어진다는 것에 관한 연구
- 🗞️ [Mystery ‘Gpt2-Chatbot’ And Cryptic Sam Altman Tweet Fuel Speculation Over OpenAI’s Next ChatGPT Update](https://www.forbes.com/sites/roberthart/2024/04/30/mystery-gpt2-chatbot-and-cryptic-sam-altman-tweet-fuel-speculation-over-openais-next-chatgpt-update/?sh=19ea4686384d)
    - LMSYS Chatbot Arena에 등장한 gpt2-chatbot이 OpenAI의 새로운 모델일 것이라는 추측.
- 📜 [Baidu] [HFT: Half Fine-Tuning for Large Language Models](https://arxiv.org/abs/2404.18466)
    - catastrophic forgetting 문제를 해결하기 위해 full fine-tuning (FFT) 대신 Half Fine-Tuning (HFT) 를 제안. 파라미터의 절반은 새로운 정보를 학습하고, 나머지 절반은 frozen 하는 방식.
- 🧑🏻‍💻 [Gradient] [LLama-3-8B-Instruct-Gradient-1048K](https://huggingface.co/gradientai/Llama-3-8B-Instruct-Gradient-1048k)
    - GradientAI에서 처리 가능한 context length가 1M에 달하는 instruct version의 라마 모델을 허깅페이스에 공개. 스펙과 예시 코드가 함께 제시되어 있음
- 📜 [Bozewn-Bolzano] [When to Retrieve: Teaching LLMs to Utilize Information Retrieval Effectively](https://arxiv.org/abs/2404.19705)
    - parametric memory로 질문에 답변하기 충분한 경우, Information Retrieval을 하지 않고 special token <RET>를 생성하도록 학습하는 방식을 제안
- 📜 [UC Berkeley] [Is Bigger Edit Batch Size Always Better? - An Empirical Study on Model Editing with Llama-3](https://arxiv.org/abs/2405.00664)
    - model editing에 있어서  edit batch-size를 키우는 것이 모델의 성능을 하락시키는 것임을 확인한 실험
- 📜 [Meta] [Better & Faster Large Language Models via Multi-token Prediction](https://arxiv.org/abs/2404.19737)
    - n개의 독립적인 head를 바탕으로 한 번에 n개의 토큰을 예측하도록 함. 속도 뿐만 아니라 성능적으로도 향상이 있었다는 실험 결과를 공개.
- 📜 [Hong Kong University] [Mixture of insighTful Experts (MoTE): The Synergy of Thought Chains and Expert Mixtures in Self-Alignment](https://arxiv.org/abs/2405.00557)
    - Question Analysis, Answer Guidance, Safe Answer production으로 구성된 AlignCoT를 제안. 추가로 Mixture of insighTful Experts(MoTE)를 제안.
- 📜 [KAIST AI] [Prometheus 2: An Open Source Language Model Specialized in Evaluating Other Language Models](https://arxiv.org/abs/2405.01535)
    - 4개의 direct assessment와 4개의 pair-wise ranking을 이용하여 LM이 평가한 결과와 사람의 평가 결과를 최대한 align할 수 있도록 함
- 📜 [Virginia]  [Context-Aware Clustering using Large Language Models](https://arxiv.org/abs/2405.00988)
    - CACTUS(Context-Aware ClusTering with aUgmented triplet losS)를 제안. supervised clustering을 위한 triplet loss function을 제안. text augmentation 기반의 self-supervised clustering task를 도입
- 🧑🏻‍💻 [Anthropic] [Introducing the Claude Team plan and iOS app](https://www.anthropic.com/news/team-plan-and-ios)
    - Claude 3 model family를 팀 요금제로 이용 가능. 웹에서와 똑같이 이용 가능한 서비스를 iOS로 제공.
- 📜 [Predibase] [LoRA Land: 310 Fine-tuned LLMs that Rival GPT-4, A Technical Report](https://arxiv.org/abs/2405.00732)
    - 10개 모델을 31개 태스크에 대해 QLoRA로 fine-tuning한 성능을 비교. GPT-4를 능가하는 결과도 있었음. 모델의 학습 결과를 예측할 수 있도록 함(어떤 수준까지 학습이 될지). LoRAX의 latency와 concurrency를 평가.
</details>

<details>
  <summary>2nd week</summary>

- 📜 [MIT] [KAN: Kolmogorov-Arnold Networks](https://arxiv.org/abs/2404.19756)
    - Multi-Layer Perceptrons(MLPs)를 대신하는 Kolmogorov-Arnold Networks(KAN)를 제안. linear weight를 전혀 사용하지 않으며 각 weight 파라미터는 univariate function으로 대체됨.
- 📜 [Imperial College London] [Argumentative Large Language Models for Explainable and Contestable Decision-Making](https://arxiv.org/abs/2405.02079)
    - reasoning 과정에서 argumentation을 생성하는 프레임워크를 제안. 이를 통해 LLM의 선택과 판단에 대한 근거를 명확하게 파악할 수 있음.
- 🗞️ [X] [X launches Stories, delivering news summarized by Grok AI](https://techcrunch.com/2024/05/03/x-launches-stories-on-x-delivering-news-summarized-by-grok-ai/)
    - 개인 맞춤화된 이야기들을 Grok AI 모델이 요약하여 제시하는 서비스를 도입. [X 링크](https://twitter.com/XEng/status/1786463531505799186?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1786463531505799186%7Ctwgr%5E75c9d4c38ea3f1bfdab9931eb077437796f87eaf%7Ctwcon%5Es1_c10&ref_url=https%3A%2F%2Ftechcrunch.com%2F2024%2F05%2F03%2Fx-launches-stories-on-x-delivering-news-summarized-by-grok-ai%2F). news 산업에 큰 영향을 줄 것으로 예상됨.
- 🧑🏻‍💻 [DeepLearning.AI & HuggingFace] [Quantization In Depth](https://www.deeplearning.ai/short-courses/quantization-in-depth/)
    - 다양한 종류의 quantization 기법에 대해 공부하고 weight를 packing 하는 방법을 습득.
- 🧑🏻‍💻 [Meta-Llama-3-120B-Instruct](https://huggingface.co/mlabonne/Meta-Llama-3-120B-Instruct)
    - “self-merge”를 이용하여 70B 사이즈의 모델을 120B까지 scaling up하여 공개. 자료형을 float16으로 유지하여 성능을 최적화할 수 있도록 “passthrough” 머지 기법을 이용.
- 🗞️ [Nvidia] [Nvidia Launches ChatRTX Chatbot for RTX GPUs](https://www.extremetech.com/computing/nvidia-launches-chatrtx-chatbot-for-rtx-gpus)
    - 소비자들에게 ‘AI on your PC’ 경험을 제공하기 위해 RTX GPU를 기반으로 동작하는 ChatRTX 챗봇을 공개. 확실히 on-device, local LLM 등에 대한 관심이 뜨거움.
- 🧑🏻‍💻 [LMSYS] [gpt2-chatbot is Back Online](https://chat.lmsys.org/)
    - 챗봇아레나에서 gpt-2-chatbot 모델이 다시 등장. 모델을 선택할 수는 없지만 프롬프트 입력 후 결과를 확인해보면 해당 모델과의 비교가 이뤄지고 있음이 확인됨.
- 🧑🏻‍💻 [DeepSeek-AI] [DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model](https://github.com/deepseek-ai/DeepSeek-V2?tab=readme-ov-file)
    - 236B 사이즈의 Mixture-of-Experts (MoE) 기반 LLM을 공개. activated parameters는 21B 수준. 학습 및 추론 둘 다 굉장히 효율적임을 강조.
- 🧑🏻‍💻 [DeepLearning.AI] [Building Agentic RAG with LlamaIndex](https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/)
    - 주어진 문서를 이해하고 복잡한 질문에 답변하도록 하는 방법에 대해 학습. 특히 여러 개의 문서를 다루거나 agent를 debug 하는 방법 등에 대해서도 학습. 강의 분량은 그렇게 많지 않아 보임.
- 📜 [xLSTM: Extended Long Short-Term Memory](https://arxiv.org/abs/2405.04517)
    - exponential gating을 도입, LSTM 메모리 구조를 변형한 sLSTM과 mLSTM을 통합. 이 둘을 통해 Transformers와 State Space Models에 준하는 성능과 scaling 가능성을 보여줌.
- 📜 [MIT] [Co-design for Efficient LLM Serving](https://arxiv.org/abs/2405.04532)
    - 현존하는 INT4 quantization 방법론에 나타나는 overhead 문제를 해결하기 위해 4-bit weight, 8-bit activation, 4-bit KV cache를 사용하는 W4A8KV4, QoQ(quattuor-octo-quattuor)를 도입
- 🧑🏻‍💻 [Google] [Meet Pixel 8a: The Google AI phone at an unbeatable value](https://blog.google/products/pixel/pixel-8a-launch/)
    - Gemini를 탑재한 스마트폰 Pixel 8, Pixel 8 Pro를 출시. 카메라의 group shot, magic editor, 음성의 audio magic eraser 등의 기능을 탑재
- 📜 [University of Texas] [Mitigating Exaggerated Safety in Large Language Models](https://arxiv.org/abs/2405.05418)
    - LLM이 유저의 질문을 harmful한 것으로 판단하고 거절하는 케이스 중 실제로 harmful 하지 않은 것을 ‘과장된(exaggerated)’ 경우라고 표현. 이러한 현상을 완화하기 위한 프롬프팅 기법을 제시함과 동시에 이러한 형상이 존재함을 확인할 수 있는 데이터셋을 제시.
- 📜 [Google Research] [Does Fine-Tuning LLMs on New Knowledge Encourage Hallucinations?](https://arxiv.org/abs/2405.05904)
    - LLM이 기존 지식과 관련 없는 내용들에 대해 일으키는 hallucination 문제를 해결하기 위해 controlled setup을 설계. closed-book QA 환경에서 실험한 결과, fine-tuning을 통해 새로운 지식을 주입하는 방식의 위험성을 입증.
      
</details>

<details>
  <summary>3rd week</summary>

- 🧑🏻‍💻 [Anthropic] [Prompt Generator](https://docs.anthropic.com/en/docs/prompt-generator)
    - 태스크에 대한 간단한 설명을 최적화된 프롬프트 템플릿으로 변환해주는 metaprompt를 공개
- 🧑🏻‍💻 [IBM] [Granite Code Models: A Family of Open Foundation Models for Code Intelligence](https://github.com/ibm-granite/granite-code-models)
    - 116개 프로그래밍 언어로 학습한 3B에서 34B에 이르는 8개의 코드 모델을 공개. 코드 관련 태스크에서 CodeGemma나 Mistral을 능가하는 성능을 보임
    - 논문 링크: https://arxiv.org/abs/2405.04324
- 🧑🏻‍💻 [OpenAI] [Hello GPT-4o](https://openai.com/index/hello-gpt-4o/)
    - audio, vision, text를 real time으로 처리 가능한 플래그십 모델을 공개. ‘o’는 모두를 뜻하는 ‘omni’의 약자. 사람의 감정을 충분히 이해하는 듯한 반응, 다양한 음성 변주, 중간에 말을 끊어도 이해가 가능한 실시간 대화 양상 등 충격적인 데모를 공개.
    - 개인적인 교육 분야에서 특히 활용 여지가 많이 커진 것 같다고 느낌.
    - [유튜브에 공개된 데모 링크](https://www.youtube.com/watch?v=DQacCB9tDaw&t=3986s)
- 📜 [Baidu] [A Survey on RAG Meets LLMs: Towards Retrieval-Augmented Large Language Models](https://arxiv.org/abs/2405.06211)
    - RAG는 생성형 AI가 지닌 기존 지식에 새로운 지식을 더해줄 수 있는 방식임. Retrieval-Augmented Large Language Models(RA-LLMs)를 architecture, training strategies, applications, 세 관점에서 서베이한 페이퍼.
- 🧑🏻‍💻 [TII] [Falcon 2](https://huggingface.co/tiiuae/falcon-11B)
    - 5,000B 토큰의 RefinedWeb으로 학습된 11B LLM. fine-tuned 되지 않은 raw 모델을 허깅페이스에 공개.
- 📜 [Cohere] [Fishing for Magikarp: Automatically Detecting Under-trained Tokens in Large Language Models](https://arxiv.org/abs/2405.05417)
    - tokenizer에 포함된 토큰 중에서 제대로 학습이 되지 않은 ‘glitch tokens’가 존재함.
    - ‘tokenizer analysis, model weight-based indicators, prompting techniques’의 조합을 이용하여 위와 같은 problematic tokens를 자동적으로 detect 하는 방법론을 제안.
- 🧑🏻‍💻 [Google] [Google I/O 2024: An I/O for a new generation](https://blog.google/inside-google/message-ceo/google-io-2024-keynote-sundar-pichai/)
    - Gemini 1.5 Pro의 context window가 2M까지 증가. 그러나 128K 이하에 대해서는 가격을 50% 낮춤 (GPT-4o 대비 30% 저렴)
    - Gemini를 구글 제품(포토, 이미지 검색, 워크 스페이스, 이메일 등)에 통합하겠다고 발표. (라이브 데모 x, 여름 또는 올해 말 출시 예정 ????)
    - GPT-4o와 마찬가지로 multimodality를 강조. 그러나 그만큼의 임팩트가 있지는 않음.
- 🧑🏻‍💻 [Salesforce] [SFR-Iterative-DPO-LLaMA-8B-R](https://huggingface.co/Salesforce/SFR-Iterative-DPO-LLaMA-3-8B-R)
    - Alpaca-Eval-V2, MT-Bench, Chat-Arena-Hard, 세 개의 벤치마크에서 작은 사이즈의 모델 중 최고 성능을 달성. human-/GPT4-labeling 없는 open-sourced 데이터셋으로 학습된 모델.
- 📜 [HuggingFace] [What matters when building vision-language models?](https://arxiv.org/abs/2405.02246)
    - vision-language models(VLMs)의 학습 방식에 대해서는 아직 자리잡은 것이 없음 → 아키텍쳐, 데이터, 학습 방식 등 다양한 실험을 통해 만든 8B 사이즈의 VLM, Idefics2를 공개. base, instructed, chat, 세 개 버전의 모델을 학습 데이터셋과 함께 공개.
- 📜 [Salesforce, UIUC] [RLHF Workflow: From Reward Modeling to Online RLHF](https://arxiv.org/abs/2405.07863)
    - Reinforcement Learning from Human Feedback(RLHF)은 offline learning setting에서만 사용 가능하다는 단점이 존재 → 다양한 오픈 소스 데이터셋과 사전에 구축된 proxy preference model을 사용함으로써 preference model을 구축. 이를 이용하여 Online Iterative RLHF를 수행.
- 📜 [Hwawei] [Beyond Scaling Laws: Understanding Transformer Performance with Associative Memory](https://arxiv.org/abs/2405.08707)
    - Transformer 기반의 모델들의 사이즈를 키우면 성능이 증가한다는 scaling law가 반드시 지켜지는 것은 아님 → Hopfield 네트워크를 사용하여 이론적 프레임워크를 제시. attention mechanism에 대한 설명이 가능해짐.
- 🧑🏻‍💻 [DeepLearning.AI] [Multi AI Agent Systems with crewAI](https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/)
    - multi agent 관련 강의. 오픈소스 라이브러리 crewAI를 사용하여 비지니스 자동화에 관한 내용을 학습.
- 🧑🏻‍💻 [OpenAI] [Improvements to data analysis in ChatGPT](https://openai.com/index/improvements-to-data-analysis-in-chatgpt/)
    - Google Drive와 Microsoft OneDrive로부터 직접 테이블과 차트를 읽고 상호작용할 수 있는 기능을 공개.
    - 차주부터 ChatGPT Plus, Team, Enterprise 유저들에게 공개.
- 📜 [University of Waterloo] [UniRAG: Universal Retrieval Augmentation for Multi-Modal Large Language Models](https://arxiv.org/abs/2405.10311)
    - Multi-Modal(MM) Large Language Models(LLMs)에 필요한 MM understanding을 강화하기 위해 추론 단계에서 few-shot examples를 제공하는 방법론을 제안.
- 🗞️ [OpenAI & Reddit] [OpenAI strikes Reddit deal to train its AI on your posts](https://www.theverge.com/2024/5/16/24158529/reddit-openai-chatgpt-api-access-advertising)
    - Reddit의 data API로부터 실시간 컨텐츠를 확인할 수 있는 계약을 체결. 연초 Google이 Reddit과 맺은 계약 규모는 약 $60M(한화 약 8백억)에 이르는 것으로 알려짐.
- 📜 [Columbia University] [LoRA Learns Less and Forgets Less](https://arxiv.org/pdf/2405.09673)
    - programming과 mathematics 도메인에서 LoRA와 full finetuning을 비교. 또한 instruction finetuning과 continued pretraining을 비교 → LoRA는 full finetuning 대비 성능 향상 폭은 작지만, 기존의 지식을 더 잘 보존하는 경향을 보임.
- 🧑🏻‍💻 [HuggingFace] [Hugging Face x LangChain : A new partner package in LangChain](https://huggingface.co/blog/langchain)
    - 허깅페이스에 업로드된 모델들을 LangChain을 통해 활용 가능하도록 업데이트한 내역을 공개.
- 🧑🏻‍💻 [TIGER-Lab] [MMLU-Pro](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)
    - 12K 개의 복잡한 질문으로 구성된 MMLU 업그레이드 버전. 선택지를 4개에서 10개로 늘림. 또한 reasoning-focused problems에 집중.
- 📜 [MIT] [The Platonic Representation Hypothesis](https://arxiv.org/abs/2405.07987)
    - 여러 모델들의 representation이 수렴한다는 주장. 여러 도메인 및 modalities에 대한 실험 결과를 포함.
    - 인공지능 모델의 발전 방향은 데이터 타입(언어의 종류, modality)과 무관할 것이라고 주장했던 사람이 생각남.
- 📜 [Meta] [Chameleon: Mixed-Modal Early-Fusion Foundation Models](https://arxiv.org/abs/2405.09818)
    - image와 text를 어떤 순서로 제공하더라도 이해하고 이를 바탕으로 생성할 수 있는 foundation model, Chameleon을 공개.
    - early-fusion, token-based, mixed-modal 세팅을 위해 필요한 inception, alignment, architectural parameterization 등
</details>

<details>
  <summary>4th week</summary>

- 📜 [University of Cambridge] [Zero-Shot Tokenizer Transfer](https://arxiv.org/abs/2405.07883)
    - 한 언어로 학습된 언어 모델이 다른 언어는 전혀 처리하지 못한다는 한계점이 존재
    - tokenizer를 입력으로 받고 이에 대응하는 embedding을 예측하도록 학습하는 hypernetwork를 제안 → encoder & decoder 둘 다에 일반화 가능하다는 것을 실험적으로 입증
- 📜 [Alibaba] [Language Models can Evaluate Themselves via Probability Discrepancy](https://arxiv.org/abs/2405.10516)
    - 기존 답변을 revise → revised 답변에 대한 조건부 확률이 기존 답변에 대한 조건부 확률보다 높다면 좋은 답변, 그렇지 않다면 나쁜 답변으로 self-evaluation하는 방법론을 제안
- 📜 [Stanford, Toronto] [Observational Scaling Laws and the Predictability of Language Model Performance](https://arxiv.org/abs/2405.10938)
    - 언어 모델의 성능이 scale에 따라 어떻게 변화할지를 이해하는 것이 중요 → 80개 의 publicly available 모델들을 통해 observational approach를 확인 → 실험을 통해 smooth, sigmoidal, predictable 패턴을 검증
- 🧑🏻‍💻 [Korea Univ.] [Horangi 한국어 LLM 리더보드](https://wandb.ai/wandb-korea/korean-llm-leaderboard/reports/-LLM---Vmlldzo3MzIyNDE2?accessToken=95bffmg3gwblgohulknz7go3h66k11uqn1l3ytjma1uj3w0l0dwh1fywgsgpbdyy)
    - W&B의 테이블 기능을 활용하여 평가 결과를 쉽게 분석 가능
    - llm-jp-eval을 기반으로 llm-kr-eval을 구축
    - Multi-turn 대화를 통해 생성 능력을 평가하는 MT-Bench를 포함
- 📜 [Microsoft] [MoRA: High-Rank Updating for Parameter-Efficient Fine-Tuning](https://arxiv.org/abs/2405.12130)
    - PEFT의 대표 주자인 LoRA는 LLM이 새로운 지식을 습득하고 기억하도록 하는 데 명백한 한계가 존재 → 학습 가능한 파라미터의 숫자는 그대로 유지하면서도 high-rank update가 가능하도록 square matrix를 이용하는 방식, MoRA를 제안
    - LoRA와 마찬가지로 학습 이후에는 weight matrix에 merge 되는 방식을 취함.
- 🧑🏻‍💻 [DeepLearning.AI & Qualcomm] [Introduction to On-Device AI](https://www.deeplearning.ai/short-courses/introduction-to-on-device-ai/)
    - 모델을 deploy 할 때 낮은 latency를 유지하면서도 privacy를 지킬 수 있는 방법 등을 학습
- 🧑🏻‍💻 [llama3-from-scratch](https://github.com/naklecha/llama3-from-scratch)
    - Karpathy가 칭찬한 repo..?
    - llama3의 구성 요소를 하나씩 간단히 살펴볼 수 있는 ipynb을 제공. meta로부터 weight를 받을 수 있는 공식 링크도 포함되어 있음.
- 📜 [ByteDance, Alibaba] [OpenRLHF: An Easy-to-use, Scalable and High-performance RLHF Framework](https://arxiv.org/abs/2405.11143)
    - LLM에 RLHF를 편하게 scaling 하기 위한 오픈소스 프레임워크. 70B 이상 모델들도 고려.
    - Ray, vLLM, DeepSpeed와 같은 다양한 학습 기법들을 동원하며 Hugging Face와도 통합 가능.
- 🧑🏻‍💻 [Anthropic] [Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet](https://transformer-circuits.pub/2024/scaling-monosemanticity/)
    - 블로그 글 원본 링크: [Mapping the Mind of a Large Language Model](https://www.anthropic.com/research/mapping-mind-language-model)
    - Claude 3 Sonnet을 통해 LLM의 interpretability와 관련된 실험을 진행하고 그 결과를 report
- 🗞️ [You can now buy a 4-foot-tall humanoid robot for $16K](https://arstechnica.com/gadgets/2024/05/unitree-starts-selling-16000-humanoid-robot/?utm_source=www.theaivalley.com)
    - Unitree G1 으로 불리는 휴머노이드 로봇을 16,000 달러에 구매 가능
    - [데모 영상](https://www.youtube.com/watch?v=GzX1qOIO1bE&t=58s)을 보면 굉장히 자연스럽고 다양한 동작을 지원함 (상당히 유연..;;)
- 🧑🏻‍💻 [Google] [New AI tools to help merchants market brands and products](https://blog.google/products/shopping/google-generative-ai-marketing-features-may-2024/)
    - 브랜드 검색 시 브랜드와 관련된 정보를 일목요연하게 정리해주는 기능
    - Product Studio에서 상품 이미지를 다른 배경이나 상황에 맞게끔 생성하여 다양한 연출이 가능
- 🧑🏻‍💻 [Microsoft] [What’s next: Microsoft Build continues the evolution and expansion of AI tools for developers](https://blogs.microsoft.com/blog/2024/05/21/whats-next-microsoft-build-continues-the-evolution-and-expansion-of-ai-tools-for-developers/)
    - Small Language Models: Phi-3-vision, Phi-3-small, New Phi-3 model, Phi-Sliica
    - Microsoft Copilots and GitHub Copilot
    - New Copilot + PCs: PyTorch and a new Web Neural Network
    - Real Time intelligence, partnerships with ADM, Khan Academy, Cognition AI
- 📜 [Google DeepMind] [Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context](https://storage.googleapis.com/deepmind-media/gemini/gemini_v1_5_report.pdf)
    - Gemini 1.5 Pro의 technical report. 현존하는 LLM 중 최강이라고 주장
    - 경량화된 모델, Gemini 1.5 Flash에 대한 실험 결과도 함께 제시
- 📜 [University of Michigan] [A Turing test of whether AI chatbots are behaviorally similar to humans](https://www.pnas.org/doi/10.1073/pnas.2313925121)
    - ChatGPT의 인간적 특성을 확인하기 위한 Turing Test 결과
- 🧑🏻‍💻 [Mistral AI] [Mistral-7B-Instruct-v0.3](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3)
    - 32768 vocab size, v3 Tokenizer 지원, function calling 가능
- 📜 [AIRI] [Your Transformer is Secretly Linear](https://arxiv.org/abs/2405.12250)
    - 연속된 layer 사이의 embedding transformation을 분석한 결과 거의 완벽한 선형 관계를 파악할 수 있었음
    - 이러한 linear block을 제거하더라도 모델의 성능에 거의 영향을 주지 않는다는 것이 관측됨
    - pretraining 단계에서 linearity를 최소화하기 위해 cosine-similarity-based regularization을 도입
- 📜 [Xi’an Jiaotong University] [Large Language Models Can Self-Correct with Minimal Effort](https://arxiv.org/abs/2405.14092)
    - 잘못된 response를 스스로 확인하고 고쳐나가는 verify-then-correct 프레임워크를 제안
- 📜 [MIT] [Not All Language Model Features Are Linear](https://arxiv.org/abs/2405.14860)
    - 최근 언어 모델이 activation space에서 1차원적인 representation을 갖는다고 주장하는 연구들이 제시됨
    - 이러한 주장과 달리 일부 언어 모델들은 inherently multi-dimensional representation을 갖는다는 것을 입증
    → 독립적인 or 동시-발생하지 않는 lower-dimensional features로 decompose 가능
- 📜 [Xi’an Jiaotong University] [Quantifying Emergence in Large Language Models](https://arxiv.org/abs/2405.12617v1)
    - 최근에는 언어 모델의 emergent ability가 잘못된 평가 지표 정의에 의한 것이라는 연구가 많음
    - → 본 연구에서는 macroscopic(semantic) & microscopic(token) level에서 entropy reduction을 비교하여 strength of emergence를 quantify
    - metric의 variance와 ICL에서 shot의 개수 등 사이의 상관 계수 등을 바탕으로 novel emergence pattern을 파악하고, 이를 통해 hallucination을 새로운 관점에서 해석
- 🧑🏻‍💻 [phidata](https://github.com/phidatahq/phidata)
    - Autonomous Assistants를 구축하는 framework
    - Assistant = LLM + Memory(Chat History, Summaries, ...) + Knowledge(PDF, Docs, … ) + Tools(Search Web, Send Email, …)
- 🧑🏻‍💻 [Mistral AI] [mistral-finetune](https://github.com/mistralai/mistral-finetune)
    - 오픈소스 미스트랄의 모델을 LoRA 기반으로 fine-tuning 할 수 있도록 공개한 코드 베이스
    - 대부분의 파라미터는 frozen & 1-2% 정도의 추가 파라미터로 학습 → A100 or H100 권장
- 📜 [EluetherAI and others] [Lessons from the Trenches on Reproducible Evaluation of Language Models](https://arxiv.org/abs/2405.14782)
    - 3년 간의 LLM 평가 경험을 바탕으로 researcher들을 위한 guidance와 lesson을 제공
    - 언어 모델 평가의 공통된 한계점, research에서의 어려움을 최소화하는 방법, 이와 같은 이슈를 해소하는 데 적합한 오픈소스 라이브러리 Language Model Evaluation Harness (lm-eval)
 
</details>
<details>
  <summary>5th week</summary>

- 📜 [Fudan University] [Aggregation of Reasoning: A Hierarchical Framework for Enhancing Answer Selection in Large Language Models](https://arxiv.org/abs/2405.12939)
    - CoT의 한계를 해결하기 위해 hierarchical reasoning aggregation framework, AoR (Aggregation or Reasoning)을 제시
    - reasoning chain에 대한 평가를 기반으로 정답을 고르는 방식. dynamic sampling 활용.
- 📜 [Cohere] [Cohere For AI Launches Aya 23, 8 and 35 Billion Parameter Open Weights Release](https://cohere.com/blog/aya23)
    - 23개 언어를 다룰 수 있는 8B, 35B 사이즈의 생성형 언어 모델 Aya 23를 공개
    - 대규모 multilingual instruction fine-tuning dataset으로 학습된 Aya 모델을 기반으로 발전
    - [technical report on Aya 23](https://cohere.com/research/aya/aya-23-technical-report.pdf?ref=cohere-ai.ghost.io)
- 📜 [National University of Singapore, Salesforce] [Decompose and Aggregate: A Step-by-Step Interpretable Evaluation Framework](https://arxiv.org/abs/2405.15329)
    - LLM의 평가 능력에 대한 interpretability가 부족
    - → 평가 과정을 여러 개의 단계로 decompose 후 결과를 aggregate 하는 방법론을 제안. 이때 교육학적 관행을 근거로 여러 단계로 구분.
- 📜 [University of Virginia, Princeton Language and Intelligence] [SimPO: Simple Preference Optimization with a Reference-Free Reward](https://arxiv.org/abs/2405.14734)
    - sequence의 평균 로그 확률을 implicit reward로 사용하여 reference model을 과정에서 제외
    - target reward margin을 사용하여 winning & losing response 간의 격차를 벌림
- 📜 [IEEE] [Wav-KAN: Wavelet Kolmogorov-Arnold Networks](https://arxiv.org/abs/2405.12832)
    - 기존 MLP나 Spl-KAN은 interpretability, 학습 속도, robustness 등의 이슈가 존재
    - wavelet function을 KAN 네트워크 구조에 통합함으로써 입력 데이터의 high-/low-frequency 요소들을 효율적으로 capture 할 수 있도록 함
- 🗞️ [xAI] [Series B Funding Round](https://x.ai/blog/series-b)
    - Valor Euquity Partners, Vy Captial 등으로부터 60억 달러 (약 7-8조..)에 해당하는 시리즈 B 펀딩을 확보
- 📜 [Fudna University] [Tokenization Matters! Degrading Large Language Models through Challenging Their Tokenization](https://arxiv.org/abs/2405.17067)
    - LLM이 특정 query에 대해 답변을 잘하지 못하는 문제 → tokenization이 원인
    - 다양한 오픈소스 LLM이 tokenization에서 겪는 어려움을 테스트하기 위한 ADT (Adversarial Dataset for Tokenizer) 구축
- 📜 [Google] [Can Large Language Models Faithfully Express Their Intrinsic Uncertainty in Words?](https://arxiv.org/abs/2405.16908)
    - LLM은 답변하기 애매한 것들에 대해 intrinsic uncertainty를 표현해야 한다고 주장
    - intrinsic uncertainty를 확인하기 위해 모델의 intrinsic confidence와 실제 결정 간의 갭을 측정할 수 있는 faithful response uncertainty를 공식화하여 실험
- 📜 [Meta] [An Introduction to Vision-Language Modeling](https://arxiv.org/abs/2405.17247)
    - 메타에서 제시한 Vision-Language Modeling 관련 서베이 페이퍼
- 📜 [Microsoft] Matryoshka Multimodal Models
    - Large Multimodal Models(LMMs)이 고해상도 이미지를 처리할 때 너무 많은 visual token을 학습해야 한다는 문제점이 존재
    - Matryoshka 인형에 착안. visual content를 여러 coarse-to-fine granularities 정보로부터의 nested sets of visual tokens로 표현하는 방법을 학습.
- 🧑🏻‍💻 [DeepLearning.AI] [AI Agentic Design Patterns with AutoGen](https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/)
    - AutoGen 프레임워크를 사용하여 다양한 역할을 수행하고 뛰어난 능력을 가진 AI application을 만드는 방법을 학습
    - Reflection, Tool use, Planning 등 다양한 agentic design pattern에 대해 학습
- 📜 [National University of Singapore] [Faithful Logical Reasoning via Symbolic Chain-of-Thought](https://arxiv.org/abs/2405.18357)
    - LLM의 logical reasoning 능력을 강화하기 위해 SymbCoT를 제안
    - 1) 자연어를 symbolic format으로 변경 2) 문제를 해결하기 위해 step-by-step plan을 구축 3) verifier가 translation & reasoning chain의 결과를 검증
- 🧑🏻‍💻 [Karpathy] [Reproducing GPT-2 (124M) in llm.c in 90 minutes for $20](https://github.com/karpathy/llm.c/discussions/481)
    - 124M: 90m, $20 / 350M: 14h, $200 / 1.6B: 1w, $2.5k
    - 124M 사이즈의 GPT-2를 A100x8를 사용하여 엄청나게 효율적으로 학습하는 방식을 공개
- 🧑🏻‍💻 [Mistral AI] [Codestral: Hello, World!](https://mistral.ai/news/codestral/)
    - 80개 이상의 프로그래밍 언어를 다룰 수 있는 코드 특화 언어 모델을 공개
    - 22B 사이즈의 모델임에도 불구하고 Llama 3 70B, CodeLlama 70B 보다 뛰어난 성능을 보임
    - [허깅페이스](https://huggingface.co/mistralai/Codestral-22B-v0.1)에서 다운로드 가능
- 📜 [The University of Edinburgh] [2BP: 2-Stage Backpropagation](https://arxiv.org/abs/2405.18047)
    - Deep Neural Networks(DNNs)를 학습시키기 위한 기존의 pipeline parallelism은 ML 프레임워크에 내장된 automatic differentiation에 의한 병목이 발생
    - → 2-stage backporpagation(2BP)을 제안. 이를 통해 1.70x 향상된 throughput을 확인
- 🗞️ [OpenAI] [OpenAI makes ChatGPT-4o's advanced tools available to users in free tier](https://www.business-standard.com/technology/tech-news/openai-makes-chatgpt-4o-s-advanced-tools-available-to-users-in-free-tier-124053000880_1.html)
    - 이제 구독을 하지 않는 일반 유저들도 GPT-4o 모델을 이용할 수 있음
    - 또한 browse, vision, data analysis, file uploads, GPTs 등의 기능도 이용 가능
- 📜 [Meta] [Nearest Neighbor Speculative Decoding for LLM Generation and Attribution](https://arc.net/l/quote/bobbepsa)
    - LLM의 hallucination 문제를 해결하기 위해 kNN-LM과 같은 semi-parametric LM이 등장하였으나 inference 속도가 느리고 non-fluent texts를 생성한다는 문제점이 존재
    - 이를 해결하기 위해 임의 길이의 real-world text spans를 LM 생성 과정에 통합하는 Nearest Neighbor Speculative Decoding (NEST)를 제안 → token-level의 retrieval을 매 inference step마다 수행
- 📜 [Adobe] [Calibrating Reasoning in Language Models with Internal Consistency](https://arc.net/l/quote/tmcvuipx)
    - CoT reasoning에 대한 모델의 internal representation에 대한 연구
    - → rationale은 정답 accuracy를 향상시키지만, 중간과 마지막 레이어 internal representation 간의 inconsistency를 야기함
</details>


## 🌞 June
<details>
  <summary>1st week</summary>

- 📜 [Renmin University] [One Token Can Help! Learning Scalable and Pluggable Virtual Tokens for Retrieval-Augmented Large Language Models](https://arxiv.org/abs/2405.19670)
    - 기존 LLM은 fine-tuning 할 경우 기존 지식이 손상될 가능성이 높다는 문제점이 존재
    - RAG를 위한 scalable & pluggable 가상 토큰을 제안. 해당 토큰에 대한 임베딩만 fine-tuning
- 📜 [Jina AI] [Jina CLIP: Your CLIP Model Is Also Your Text Retriever](https://arxiv.org/abs/2405.20204)
    - Contrastive Language-Image Pretraining(CLIP)을 text-only task에 적용 가능. 하지만 text-only 또는 multimodal tasks에 따라 독립된 embedding을 유지해야 한다는 문제점 존재.
    - → 이를 해결하기 위해 multi-task contrastive training method를 제안
- 🧑🏻‍💻 [Anthropic] [Claude can now use tools](https://www.anthropic.com/news/tool-use-ga)
    - Claude에도 외부 API나 tool과 연동할 수 있는 기능이 추가됨
    - 예를 들어 구조화된 데이터 추출, DB 기반 검색 및 답변, API 기능 자동화 등에 활용 가능
- 🧑🏻‍💻 [Perplexity] [Introducing Perplexity Pages](https://www.perplexity.ai/hub/blog/perplexity-pages)
    - 프롬프트 기반으로 커스텀 가능한 웹 페이지를 제작하는 기능 Pages를 오픈

</details>

<details>
  <summary>2nd week</summary>
  
- [Meta] [Contextual Position Encoding: Learning to Count What’s Important](https://arxiv.org/abs/2405.18719)
    - 현재의 Position Encoding (PE) 방식은 토큰 개수를 세는 방식으로 일반화가 어렵다는 문제점
    - → 모델에 의해 결정되는 특정 토큰에 대한 position만 확장함으로써 position이 context에 conditioned 될 수 있도록 하는 Contextual Position Encoding(CoPE)를 제안
- 🗞️ [Samsung] [Samsung’s Galaxy S24 Series Dominates GenAI-capable Smartphone Market in Q1 2024](https://www.counterpointresearch.com/insights/global-top-10-best-selling-genai-smartphones-q1-2024/)
    - 2024년도 1분기 스마트폰 시장에서 GenAI 스마트폰의 비중은 약 6% 정도. 이에 대한 삼성의 지분은 50% 이상임.
    - AI 기술 발전을 내세울 것으로 예상되는 애플의 WWDC가 많은 이들의 기대를 받고 있음
- 📜 [Princeton, CMU] [Transformers are SSMs: Generalized Models and Efficient Algorithms Through Structured State Space Duality](https://arc.net/l/quote/avdoajmy)
    - Mamba의 저자가 후속 연구로 제시한 Mamba-2
    - 핵심 레이어의 연산 속도가 Mamba의 selective SSM보다 2-8배 정도 빠르면서, 트랜스포머 기반의 언어 모델과 견줄 수 있는 성능을 내세움
- 📜 [Perdue] [SaySelf: Teaching LLMs to Express Confidence with Self-Reflective Rationales](https://arxiv.org/abs/2405.20974)
    - LLM의 confidence와 관련해서 prompt-based 연구와 supervised finetuning 연구가 존재
    - → fine-grained confidence estimates를 표현하도록 가르치는 SaySelf 방법론을 제안
    - 추가적으로 LLM은 스스로의 parametric knowledge를 나타내는 self-reflective rationale을 생성하고, 반대로 uncertainty를 표현할 수 있게 됨
- 🧑🏻‍💻 [LlamaIndex] [Introducing the Property Graph Index: A Powerful New Way to Build Knowledge Graphs with LLMs](https://www.llamaindex.ai/blog/introducing-the-property-graph-index-a-powerful-new-way-to-build-knowledge-graphs-with-llms)
    - 그래프를 구성하는 노드 및 관계를 categorize
    - 그래프를 hybrid search를 위한 vector database로 사용 가능
    - Cypher graph query language를 이용한 복잡한 query 표현 가능
- 🧑🏻‍💻 [DeepLearning.AI] [AI Agents in LangGraph](https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/)
    - Python과 LLM을 이용하여 Agent를 구현하는 것을 scratch부터 학습
    - 추가로, 여러 개의 답변을 agent-friendly 형식으로 반환하는 agent serarch도 다룸
- 📜 [ByteDance] [Exploring Mathematical Extrapolation of Large Language Models with Synthetic Data](https://arxiv.org/abs/2406.02100)
    - 새로 제시한 arithmetical puzzle problem을 통해 LLM이 고품질 합성데이터로 학습된 경우 multi-step reasoning 능력을 크게 향상시킬 수 있음을 확인
    - 또한 추가 실험을 통해 out-of-domain 데이터셋에 대한 성능도 준수하다는 것을 확인
- 📜 [Google DeepMind] [To Believe or Not to Believe Your LLM](https://arxiv.org/abs/2406.02543)
    - 언어 모델 답변의 불확실성은 epistemic (지식 부족) & aleatoric (랜덤, 확률) uncertainty로 구분됨
    - information-theoretic metric을 사용하여 언제 epistemic uncertainty가 높은지를 탐지
    - 이전의 답변을 기반으로 삼는 iterative prompting을 통해 metric을 계산. 즉, log-likelihood 등을 사용하지 않음.
- 🧑🏻‍💻 [Google] [PlaiGemma](https://ai.google.dev/gemma/docs/paligemma)
    - SigLIP vision model과 Gemma language model을 기반으로 만든 lightweight open vision-language model (VLM), PaliGemma를 공개
    - 다양한 태스크를 처리할 수 있는 PaliGemma와 특정 research dataset에 fine-tuned PaliGemma-FT를 공개
    - [캐글](https://www.kaggle.com/models/google/paligemma)에서 다운로드 가능
- 🧑🏻‍💻 [Mistral AI] [My Tailor is Mistral](https://mistral.ai/news/customization/)
    - Mistral fine-tuning API & SDK를 이용하여 Mistral 모델을 fine-tuning 하는 기능을 공개
    - LoRA를 기반으로 하여 memory-efficient 하면서도 performant한 fine-tuning 기법을 도입
- 📜 [KAIST, LG AI] [Block Transformer: Global-to-Local Language Modeling for Fast Inference](https://arxiv.org/abs/2406.02657)
    - LLM의 inference에서 KV cache는 심각한 병목의 원인이 됨
    - → 낮은 layer에 대한 global modeling의 병목을 고립시키고, 상위 layer에 대해 fast local modeling을 적용. 입력 토큰을 특정 사이즈의 블록으로 압축하고 coarse level로 self attention을 적용.
- 🧑🏻‍💻📜 [OpenAI] [Extracting Concepts from GPT-4](https://openai.com/index/extracting-concepts-from-gpt-4/)
    - 아카이브 논문 [링크](https://arxiv.org/abs/2406.04093v1) 🔗
    - GPT-4의 internal representation을 16M 개의 oft-interpretable pattern으로 decompose하기 위해 고안한 scalable method를 공개
    - k-sparse autoencoders를 제안하여 sparsity를 control 함과 동시에 reconstruction-sparsity frontier를 tuning하고 개선하는 과정을 간소화
    - autoencoder의 크기와 sparsity 간의 확연한 scaling laws를 관측
- 🧑🏻‍💻 [Google] [NotebookLM goes global with Slides support and better ways to fact-check](https://blog.google/technology/ai/notebooklm-goes-global-support-for-websites-slides-fact-check/)
    - 작년 여름에 공개했던 NotebookLM을 Gemini 1.5 Pro 업그레이드
    - Google Slide, web URL, Google Docs, PDFs, text files를 지원
    - [NotebookLM 링크](https://notebooklm.google.com/?original_referer=https://blog.google%23&pli=1)🔗에서 가이드 확인 및 노트북 생성 가능
- 📜 [ELLIS] [Semantically Diverse Language Generation for Uncertainty Estimation in Language Models](https://arxiv.org/abs/2406.04306)
    - LLM의 예측 불확실성을 정량적으로 측정하기 위해 Semantically Diverse Language Generation (SDLG)를 제안
    - 이를 통해 initial text가 hallucinated 인지 아닌지 판단할 수 있음
- 📜 [Peking, Berkeley, Stanford] [Buffer of Thoughts: Thought-Augmented Reasoning with Large Language Models](https://arxiv.org/abs/2406.04271)
    - thought-augmented reasoning approach, Buffer of Thoughts (BoT)를 제안
    - meta-buffer: 유익한 high-level thoughts를 저장
    - buffer-manager: meta-buffer를 동적으로 업데이트하여 meta-buffer의 capacity를 향상
- 🗞️ [KLING] [Forget Sora — Kling is a killer new AI video model that just dropped and I’m impressed](https://www.tomsguide.com/ai/ai-image-video/forget-sora-kling-is-a-killer-new-ai-video-model-that-just-dropped-and-im-impressed)
    - 중국의 비디오 플랫폼 회사 Kuaishou가 longer video generations, improved movement, better prompt following 등을 자랑하는 비디오 모델 Kling을 공개
- 🧑🏻‍💻 [Alibaba] [Hello Qwen2](https://qwenlm.github.io/blog/qwen2/)
    - 다섯 종류의 모델 사이즈: 0.5B, 1.5B, 7B, 57B-14B, 72B
    - coding, mathematics, multilingual understanding, long-context understanding 등에서 Meta의 Llama3나 OpenAI의 GPT-4를 능가하는 수준의 성능을 보임

</details>

<details>
  <summary>3rd week</summary>

- 📜 [Santa Cruz] [Scalable MatMul-free Language Modeling](https://arxiv.org/abs/2406.02528)
    - LLM의 주된 계산 비용을 차지하는 행렬곱(MatMul) 연산을 제거
    - MatMul-free 모델이 transformer 기반의 모델보다 2.7B 사이즈까지 뛰어나도록 학습한 결과를 제시
- 📜 [University of Chicago] [The Geometry of Categorical and Hierarchical Concepts in Large Language Models](https://arxiv.org/abs/2406.01506)
    - categorical concepts은 어떻게 represented 되는가? 두 개념 간 계층적 관계는 어떻게 encoded 되는가?
    - 전자는 simplices, 후자는 orthogonal, 복잡한 개념은 direct sum으로 구성된 polytope로 표현
- 🧑🏻‍💻 [Andrej Karpathy] [Let's reproduce GPT-2 (124M)](https://www.youtube.com/watch?v=l8pRSuU81PU)
    - Model Construction, Speed Optimization, Hyperparameter Setup, Model Evaluation and Training 등을 중심으로 유튜브에 GPT-2 모델 학습 영상을 업로드
- 🧑🏻‍💻 [OpenAI, Apple] [OpenAI and Apple announce partnership to integrate ChatGPT into Apple experiences](https://arc.net/l/quote/jbenmlas)
    - WWDC 2024에서 OpenAI의 ChatGPT를 Siri에 탑재하겠다는 계획을 발표.
    - privacy와 관련해서 애플이 직접 데이터 센터를 구축하고 관리하겠다고 함.
- 📜 [University of Waterloo] [GenAI Arena: An Open Evaluation Platform for Generative Models](https://arxiv.org/abs/2406.04485)
    - image, video 생성 모델들을 유저가 평가하는 GenAI Arena에 관한 논문. 4개월 이상 운영하며 6천 개 이상의 투표 정보를 수집.
    - text-to-image, text-to-video, image editing, 세 영역에 대한 평가가 가능
- 📜 [AI2] [WildBench: Benchmarking LLMs with Challenging Tasks from Real Users in the Wild](https://arxiv.org/abs/2406.04770)
    - 백만 개 이상의 human-chatbot 대화 로그에서 엄선한 1,024개의 task
    - GPT-4 turbo와 같은 LLM을 사용하여 WB-Reward, WB-Score 을 기준으로 평가 자동화
    - fine-grained pari-wise comparision 방식을 사용했으며, 세 개의 베이스라인을 설정
- 📜 [Duke, Stanford, Together AI] [Mixture-of-Agents Enhances Large Language Model Capabilities](https://arxiv.org/abs/2406.04692)
    - 여러 LLM의 collective strength를 이용하는 Mixture-of-Agents (MoA) 방식을 제안
    - 즉, 여러 개의 LLM agents로 각 layer를 구성하는 방식. 각 agent는 이전 레이어의 결과물을 auxiliary information으로 활용.
- 🗞️ [LLMs Aren’t Just “Trained On the Internet” Anymore](https://allenpike.com/2024/llms-trained-on-internet)
    - 기존 데이터들만을 활용해서는 LLM이 기존 데이터와 다른 출력을 만들지 못하게 됨
    - 맞춤형 학습데이터를 제작하여 활용하는 방식이 대두. Phi-3가 대표적인 모델이며 [Scale.ai](http://Scale.ai) 같은 회사가 크게 주목을 받게 됨.
- 📜 [University of Washington] [Do LLMs Exhibit Human-Like Reasoning? Evaluating Theory of Mind in LLMs for Open-Ended Responses](https://arxiv.org/abs/2406.05659)
    - Theory of Mind (ToM) Reasoning은 다른 개인들이 고유한 의도, 감정 등을 소유했다는 것을 전제로 함
    - Reddit, ChangedMyView에서 수집한 포스트에서 사람과 LLM 응답 간의 의미적 유사성 및 어휘 중복 정도를 비교 → open-ended scenarios에서 명백한 한계를 보임
    - LLM은 아직까지 social reasoning 성능이 부족함을 입증하고 어떻게 인간 의도와 감정을 통합할 수 있는지에 대한 방법을 제시
- 📜 [ByteDance] [Autoregressive Model Beats Diffusion: Llama for Scalable Image Generation](https://arxiv.org/abs/2406.06525)
    - next-token prediction 패러다임을 적용한 이미지 생성 모델, LlamaGen을 제시
    - (1) image tokenizer (2) class-conditional image generation (3) text-conditional image generation (4) optimizaing the inference speed of image generation
- 📜 [Washington, Meta, AI2] [Husky: A Unified, Open-Source Language Agent for Multi-Step Reasoning](https://arxiv.org/abs/2406.06469)
    - 기존 agents는 proprietary models 기반이거나 특정 태스크에 적합하도록 디자인되어 있음
    - → numerical, tabular, knowledge-based reasoning을 다룰 수 있는, 즉 unified action space에서 학습한 open-source language agent, Husky를 제안
    - 1) 다음 단계에 수행할 작업을 예측 2) expert 모델이 선택된 작업을 실행하고 상태 업데이트
    - 7B 모델로도 GPT-4에 준하거나 그 이상의 성능을 보임
- 📜 [OpenAI, Stnaford, Microsoft] [The Prompt Report: A Systematic Survey of Prompting Techniques](https://arxiv.org/abs/2406.06608)
    - 프롬프트와 관련한 33개 어휘를 정리
    - 58개의 프롬프팅 테크닉과 다른 modality에 활용 가능한 40개의 테크닉을 정리
    - 자연어 prefix-prompting에 대한 내용도 다루고 있음
- 🧑🏻‍💻 [Microsoft] [Generative-AI-For-Beginners](https://github.com/microsoft/generative-ai-for-beginners)
    - Azure OpenAI, OpenAI API를 활용한 코드 샘플
    - 생성형 AI application을 만드는 데 필요한 18개의 강의를 제공
    - 데이터 베이스와 관련된 강의를 DeepLearning.AI 에서도 제공
- 🧑🏻‍💻 [Luma AI] [Dream Machine](https://lumalabs.ai/dream-machine)
    - OpenAI Sora에 견줄만한 text-to-video 모델을 무료로 공개
- 📜 [University of Toronto] [Out-Of-Context Prompting Boosts Fairness and Robustness in Large Language Model Predictions](https://arxiv.org/abs/2406.07685)
    - 기존에는 LLM의 causal reasoning 능력을 바탕으로 fair & robust 한 답변을 할 수 있도록 세팅
    - → 반대로 out-of-comtext prompting을 제안 (테스트 단계에서)
- 📜 [New York University] [Large Language Models Must Be Taught to Know What They Don't Know](https://arxiv.org/abs/2406.08391)
    - 모델 스스로에 대해 prompting 하는 것은 좋은 calibration으로 이어지지 않는다.
    - → 작은 correct & incorrect answer로 fine-tuning 함으로써 불확실성 추정에 대한 일반화 성능을 끌어올릴 수 있다.
    - 인간과 AI가 협력하는 환경에서의 불확실성 추정이 어떻게 인간 의사결정에 도움이 되는지 연구
- 📜 [University of Edinburgh] [Are We Done with MMLU?](https://arxiv.org/abs/2406.04127)
    - MMLU 벤치마크의 정당성 검토 → Virology 파트 분석 결과 57% 문제
    - error taxonomy를 이용하여 데이터셋을 확인하는 프레임워크, MMLU-Redux를 제안
    - 30개의 MMLU subjects에 대해서 3,000개를 reannotate → 벤치마크 성능과 실제 체감 성능 간의 괴리를 줄이고자 함
- 📜 [NVIDIA] [Nemotron-4 340B](https://research.nvidia.com/publication/2024-06_nemotron-4-340b)
    - Base, Instruct, Reward, 세 버전의 모델 패밀리를 오픈 소스로 공개
    - smaller language model 을 학습할 때 사용할 합성데이터를 생성하는 데 활용 가능
</details>

<details>
  <summary>4th week</summary>
  
- 📜 [Fudan, AI2] [SelfGoal: Your Language Agents Already Know How to Achieve High-level Goals](https://arc.net/l/quote/fcednhje)
    - 기존 agents는 구체적인 instruction이 없으면 목표를 달성하지 못하거나 피드백이 늦게 제공되는 상황에서는 적응을 어려워한다는 문제점이 존재
    - → 사람이 제공하는 피드백이 제한되고 느린(delayed) 상황에서도 high-level goal을 달성할 수 있도록 돕는 automatic apporach, SelfGoal을 제안
    - 핵심: high-level goal을 실용적인 subgoal로 이루어진 tree structure로 쪼개는 것
- 📜 [AIRI] [BABILong: Testing the Limits of LLMs with Long Context Reasoning-in-a-Haystack](https://arxiv.org/abs/2406.10149)
    - LLM의 long context 이해 능력을 파악하기 위한 벤치마크, BABILong을 소개.
    - 20여개의 다양한 reasoning tasks를 포함
    - 아직까지는 유의미한 long context understanding 벤치마크가 없다고 생각하는데, 향후 유의미한 연구들이 등장할 것인지 개인적인 의문
- 📜 [Hong Kong Science] [Know the Unknown: An Uncertainty-Sensitive Method for LLM Instruction Tuning](https://arxiv.org/abs/2406.10099)
    - LLM은 질문에 ‘답변’하도록 학습되었기 때문에 ‘모르는 걸 모른다’고 이야기하지 않는 특징이 있음
    - → uncertainity-sensitive tuning: uncertainty recognition + prompt-sensitive activation
    - 모르는 질문을 거절 + causal instruction을 통해 퍼포먼스 회복
- 📜 [AIRI] [XLand-100B: A Large-Scale Multi-Task Dataset for In-Context Reinforcement Learning](https://arxiv.org/abs/2406.08973)
    - XLand—MiniGrid 환경을 기반으로 삼는 in-context reinforcement learning을 위한 대규모 데이터셋
- 📜 [Fudan, Tsinghua] [Needle In A Multimodal Haystack](https://arxiv.org/abs/2406.07230)
    - MLLMs의 long multimodal documents 이해력을 파악하기 위한 벤치마크, MM-NIAH
    - multimodal retrieval, counting, reasoning, 세 타입의 태스크를 포함
- 🧑🏻‍💻 [DeepSeek AI] [DeepSeek-Coder-V2: Breaking the Barrier of Closed-Source Models in Code Intelligence](https://github.com/deepseek-ai/DeepSeek-Coder-V2?tab=readme-ov-file)
    - MoE 아키텍쳐를 사용하여 16/236B 파라미터 사이즈를 가진 오픈소스 코드 LLM
    - 338개 언어, 128K 컨텍스트 길이 지원
    - 코딩 벤치마크에서 GPT-4-turbo를 능가하는 퍼포먼스 달성
- 📜 [Fudan, Shanghai] [Accessing GPT-4 level Mathematical Olympiad Solutions via Monte Carlo Tree Self-refine with LLaMa-3 8B](https://arxiv.org/abs/2406.07394)
    - MCT Self-refine (MCTSr) 알고리즘을 제안: LLM + MCTS
    - Selection, self-refine, self-evaluation, Backpropagation 과정을 반복하며 MCTS 수행
        - 이때 Upper Confidence Bound (UCB) 공식이 활용됨
- 🧑🏻‍💻 [Google DeepMind] [Generating audio for video](https://deepmind.google/discover/blog/generating-audio-for-video/)
    - video 픽셀과 텍스트 프롬프트를 이용하여 풍부한 soundtrack을 생성 (V2A)
    - positive - negative prompt를 구분할 수 있을 정도로 정교한 컨트롤이 가능해짐
- 🧑🏻‍💻 [runway] [Introducing Gen-3 Alpha](https://runwayml.com/blog/introducing-gen-3-alpha/)
    - fidelity, consistency, motion을 크게 개선한 text-to-video 생성 모델
    - Sora의 등장 이후로 이와 같은 고해상도 비디오 생성 모델들의 발전이 빠르게 이어지고 있는 듯한 느낌이 듦
- 📜 [Tisnghua] [Retrieval Meets Reasoning: Dynamic In-Context Editing for Long-Text Understanding](https://arxiv.org/abs/2406.12331)
    - RAG를 사용하더라도, 참조하는 source가 충분하지 않은 경우 결국 답변하지 못함
    - → 긴 context를 malleable(벼릴 수 있는) 외부 지식으로 생각하고 이를 dynamic하게 모으거나 통합하는 방법론
- 📜 [Cohere] [Back to Basics: Revisiting REINFORCE Style Optimization for Learning from Human Feedback in LLMs](https://arxiv.org/abs/2402.14740)
    - 지금까지 RLHF에 PPO가 정설처럼 여겨져 왔지만, 연산 비용이 많이 발생하고 하이퍼 파라미터에 민감하다는 한계가 존재
    - → PPO의 많은 요소가 RLHF에 불필요함을 입증 & DPO, RAFT와 같은 RL-free 방식이 PPO보다 뛰어나다는 것을 입증
    - 🧑🏻‍💻 [RLOO 알고리즘을 설명한 허깅페이스 블로그 링크](https://huggingface.co/blog/putting_rl_back_in_rlhf_with_rloo)
- 🧑🏻‍💻 [Cohere] [Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet)
    - 전작 Claude 3 Opus에 비해 속도와 성능이 훨씬 뛰어난 모델 Claude 3.5 Sonnet을 공개 (2배 속도, 80% 저렴)
    - 뛰어난 coding 능력과 visual reasoning 능력을 강조
    - code snippets & website design과 같이 AI-generated content와 상호작용 가능한 Artifacts 기능을 공개
- 📜 [University of Maryland] [GenQA: Generating Millions of Instructions from a Handful of Prompts](https://arxiv.org/abs/2406.10323)
    - public instruction finetuning datasets은 closed source datasets에 비해 훨씬 부족한 상황
    - → single prompt로 large instruction datasets를 생성하는 방법을 제안
    - simple completion task부터 complex multi-turn dialogs까지 다양한 태스크에 이르는 데이터셋을 생성 가능
- 📜 [Georgia, MIT] [Self-MoE: Towards Compositional Large Language Models with Self-Specialized Experts](https://arxiv.org/abs/2406.12034)
    - 하나로 통합된 LLM을 self-specialized experts로 구성된 module system으로 변환하는 방법론, MiXSE (MiXture of Self-specialized Experts)
    - self-generated 합성 데이터를 사용하여 expert module을 구축 + self-optimized routing으로 통합
    - 다른 방법론들에 비해 trade-off (학습하면 기존의 것을 까먹어 버리는 것에 대한)가 적은 편이라고 언급
- 🧑🏻‍💻 [Meta] [Sharing new research, models, and datasets from Meta FAIR](https://ai.meta.com/blog/meta-fair-research-new-releases/)
    - text & image의 어떤 조합이든 input, output으로 처리 가능한 Meta Chameleon ([권한](https://ai.meta.com/resources/models-and-libraries/chameleon-downloads/?gk_enable=chameleon_web_flow_is_live) 🔗)
    - 한 번에 여러 개의 토큰을 예측하는 Multi-Token Prediction ([HuggingFace](https://huggingface.co/facebook/multi-token-prediction) 🤗)
    - Meta Joint Audio and Symbolic Conditioning for Temporally Controlled Text-to-Music Generation ([데모](https://pages.cs.huji.ac.il/adiyoss-lab/JASCO/) 🔗)
    - 최초의 audio 워터마크 기법 (faster & efficient detection), AudioSeal ([Github](https://pages.cs.huji.ac.il/adiyoss-lab/JASCO/) 🧑🏻‍💻)
    - Partnership supporting the release of the PRISM dataset ([HuggingFace](https://huggingface.co/datasets/HannahRoseKirk/prism-alignment) 🤗, [Report](https://arxiv.org/abs/2404.16019) 📜)
    - text-to-image 생성 시스템의 geographical 불균형을 측정 및 개선 ([Github](https://github.com/facebookresearch/DIG-In) 🧑🏻‍💻, [Dataset](https://github.com/facebookresearch/DIG-In/blob/main/task2_geode.csv) 🧑🏻‍💻)
</details>

<details>
  <summary>5th week</summary>

- 📜 [Zou group] [TextGrad: Automatic "Differentiation" via Text](https://arxiv.org/abs/2406.07496v1)
    - 여러 개의 LLM을 통합한 시스템 대두 → 자동화된 학습 최적화 방식 고안 필요성
    - compound AI 시스템의 개별 구성 요소를 LLM에 의해 제공되는 피드백으로 개선
    - LLM은 general & rich 자연어로 피드백을 제공 → out-of-the-box 태스크도 잘 수행
    - [깃허브 링크](https://github.com/zou-group/textgrad) 🔗
- 📜 [Bloomberg] [Generate-then-Ground in Retrieval-Augmented Generation for Multi-hop Question Answering](https://arxiv.org/abs/2406.14891) (ACL 2024 main)
    - RAG는 retriever 성능에 영향을 크게 받을 뿐만 아니라 retrieved documents에 존재하는 noise 이슈가 있음
    - → generate-then-ground (GenGround) 프레임워크를 제시: 최종 답변이 도출될 때까지 두 단락을 번갈아보는 방식
    - Generate: 더 간단한 single-hop question과 이에 대응하는 정답을 생성
    - Ground: retrieved documnets에서 question-answer pair를 ground
- 📜 [USTC] [Retrieve-Plan-Generation: An Iterative Planning and Answering Framework for Knowledge-Intensive LLM Generation](https://arxiv.org/abs/2406.14979)
    - RAG는 LLM generation 자체의 inherent uncertainty & off-topic information 포함 (문서가) 이슈가 있음
    - → Retrieve-Plan-Generation (RPG) 프레임워크를 제안
    - Plan stage: subsequent generation을 가이드하는 plan tokens을 생성
    - Answer stage: plan을 근거로 fine-grained paragraphs를 선택, 이를 바탕으로 futher answer 생성
    - 위 과정을 completion 될 때까지 반복
- 📜 [Amherst, Meta] [Judging the Judges: Evaluating Alignment and Vulnerabilities in LLMs-as-Judges](https://arxiv.org/abs/2406.12624)
    - LLM-as-Judeg 패러다임에는 LLM과 관련된 근본적인 문제들이 존재
    - 단순 의견 일치 비율 대신 Cohen’s Kappa Metric을 사용하는 것의 중요성을 강조
    - 여러 언어 모델을 비교(base, instruction-tuned)한 결과를 제시: 작은 모델을 잘 학습하면 큰 모델보다 뛰어남
- 🧑🏻‍💻 [Andrej Karpathy] https://github.com/karpathy/LLM101n
    - 스토리텔링 AI LLM 구축 방법을 알려주는 강의를 담은 repo
    - from scratch in Python, C and CUDA
- 📜 [ICL, Tisnghua] [Entropy-Based Decoding for Retrieval-Augmented Large Language Models](https://arxiv.org/abs/2406.17519)
    - retrieval-augmented LLM은 external & internal knowledge source에 존재하는 noise로 인한 한계점이 존재
    - → training-free decoding method를 제안
    - entropy-based document-parallel ensemble: retrieved 문서로부터 low-entropy distribution에 우선순위를 높이고자 함
    - constrastive decoding 메커니즘을 통합
- 🧑🏻‍💻 [HuggingFace] [Open-llm-leaderboard 2](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
    - 오픈 llm 리더보드 2
    - Qwen2 72B instruct > llama 3 70B > CommandR
    - MMLU-pro, GPQA, BBH 등 어려운 벤치마크 추가
- 📜 [Peking, HKUST, MIT] [Efficient Continual Pre-training by Mitigating the Stability Gap](https://arxiv.org/abs/2406.14833)
    - stability gap: 학습 초기에 일시적인 퍼포먼스 drop, 이후 회복 단계를 거치는 현상. 이로 인한 catastrophic forgetting 이슈와 domain adapating이 어렵다는 이슈가 존재.
    - → 이를 해결하기 위한 세 가지 학습 전략을 제시
    - 1) 여러 epoch 동안 적당한 사이즈의 subset으로 continual pre-training (single epoch, large corpus 대신)
    - 2) high-quality의 sub-corpus에 대해서만 pre-training
    - 3) pre-training data와의 갭을 줄여줄 수 있는 data mixture를 사용
    - 의료 도메인(Llama-3-Physician) 적용 결과를 제시
- 📜 [ByteDance, MIT-IBM] [Selective Prompting Tuning for Personalized Conversations with LLM](https://arxiv.org/abs/2406.18187)s (ACL 2024)
    - 개인화된 LLM을 만드는 방법론
    - prompt engineering보다 fine-tuning이 원하는 답변을 생성할 가능성이 더 높더라 → Selective Prompt Tuning (SPT)
    - soft prompts로 시작하고 학습 가능한 dense retriever를 사용하여 input context 기반 최적의 soft prompt를 dynamic하게 고르는 방식을 제안
    - Context-Prompt Contrastive Learning & Prompt Fusion Learning
- 📜 [HuggingFace] [The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale](https://arxiv.org/abs/2406.17557)
    - Llama3, Mixtral과 같은 모델들도 사전학습 데이터를 공개하지는 않았음
    - 96개의 Common Crawl snapshot으로부터 15T token 데이터셋을 구축 for pretraining
    - 이 FineWeb으로부터 추가 filtering을 한 1.3T token 데이터셋 FineWeb-Edu 또한 공개
- 📜 [Hong Kong, Tsinghua, NVIDIA, HKUST] [Unlocking Continual Learning Abilities in Language Models](https://arxiv.org/abs/2406.17245)
    - old task data & task-wise inductive bias를 LLM에 주입하는 것이 현재 continual learning 방식인데, 옛날 데이터들은 접근이 어렵다거나 값이 비싸다는 이슈가 있음
    - MIGU (MagnItude-based Gradient Updating for continual learning): LM의 linear layer에서 가장 큰 output 크기를 갖는 파라미터 업데이트에 집중하는 방식
- 🧑🏻‍💻 [Google] [Gemma 2 is now available to researchers and developers](https://blog.google/technology/developers/google-gemma-2/)
    - 9B/27B 사이즈의 Gemma 2 모델을 오픈소스로 공개. 동일 사이즈 모델들 대비 뛰어난 성능
    - 27B 모델의 경우 A100/H100 한 대에서 추론 가능
    - [Kaggle](https://www.kaggle.com/models/google/gemma-2), [HuggingFace](https://huggingface.co/google/gemma-2-9b) 등에서 다운로드 가능
- 📜 [Tsinghua] [Aligning Teacher with Student Preferences for Tailored Training Data Generation](https://arxiv.org/abs/2406.19227)
    - teacher가 student의 선호에 의해 기반한 교육 content를 만드는 ‘responsive teaching’에 대한 논의는 부족 → Aligning teacheR with studenT preferencEs (ARTE) 제안 - 너무 억지;;
    - 학생의 선호를 반영한 학습 예시를 생성 for Knowledge Distillation
    - 우선 teacher model이 draft question & rationale 생성 → 이에 대한 학생의 in-context learning 능력을 proxy로 사용 → teacher model을 학생의 선호에 DPO
- 📜 [CMU, KAIST] [Learning to Correct for QA Reasoning with Black-box LLMs](https://arxiv.org/abs/2406.18695)
    - LLM reasoning 능력을 향상시키고자 하더라도 black box 모델이라 방법들이 많이 제한됨
    - → CoBB (Correct for improving QA reasoning of Black-Box LLMs)
    - 불완전한 추론을 올바른 추론으로 Seq2Seq 매핑하는 학습된 adaptation 모델을 사용
    - dataset과 sampled sub-dataset의 divergence를 최소화하기 위한 유전 알고리즘 적용
- 📜 [UC Berkeley, Toronto, Anthropic] [Connecting the Dots: LLMs can Infer and Verbalize Latent Structure from Disparate Training Data](https://arxiv.org/abs/2406.14546)
    - LLM을 학습할 때 사용되는 데이터에서 safety risk가 있는 데이터들을 제거하더라도 LLM의 추론 능력으로 인해 간접적인 추론이 가능하다는 주장
    - 이를 inductive out-of-context (OOCR) 으로 표현
    - 작은 모델은 부족하지만, GPT-3.5, GPT-4 정도의 모델들은 충분 → 명시적으로 학습하지 않은 내용도 유추가 가능함을 입증. LLM 학습의 새로운 위험성을 제시.
- 📜 [Meta] [Meta Large Language Model Compiler: Foundation Models of Compiler Optimization](https://ai.meta.com/research/publications/meta-large-language-model-compiler-foundation-models-of-compiler-optimization/)
    - Meta Large Language Model Compiler (LLM Compiler) for code optimization task
    - 546B 토큰의 LLVM-IR & assembly 코드로 학습 후 compiler behavior를 instruction fine-tuning
    - 7B & 13B 사이즈의 모델을 공개
</details>  


## ☔️ July
<details>
  <summary>1st week</summary>

- 📜 [Zhejiang University] [On LLMs-Driven Synthetic Data Generation, Curation, and Evaluation: A Survey](https://arxiv.org/abs/2406.15126)
    - 최근 LLM으로 합성 데이터를 만들어 데이터 부족 문제를 해결하고 데이터 품질을 끌어 올리려는 시도가 활발.
    - industry & academy 양측을 위한 합성 데이터 생성 관련 연구에 대한 폭 넓은 조사 결과를 공유
- 📜 [Tsinghua, Microsoft] [Direct Preference Knowledge Distillation for Large Language Models](https://arxiv.org/abs/2406.19774)
    - 기존 Knowledge Distillation은 inefficiency & insufficient measurement, 두 문제점 존재
    - 선호 차를 바탕으로 implicit reward function을 학습하도록 하는 DPKD 제시
    - Implicit reward & Reverse KL divergence
- 📜 [Tencent AI] [Scaling Synthetic Data Creation with 1,000,000,000 Personas](https://arxiv.org/abs/2406.20094)
    - 웹 데이터로부터 자동적으로 생성된 1B 이상의 다양한 persona를 모아둔 Persona Hub
    - 다양한 시나리오를 대상으로 삼는 합성 데이터 생성 용이 (persona-driven data synthesis)
- 📜 [University of Wisoconsin-Madison] [From Artificial Needles to Real Haystacks: Improving Retrieval Capabilities in LLMs by Finetuning on Synthetic Data](https://arxiv.org/abs/2406.19292)
    - LLM이 long-context input을 잘 처리할 수 있도록 숫자 key-value 쌍으로 구성된 합성 데이터셋을 이용한 fine-tuning 기법을 제시
    - 일반적인 LLM이 long-context task에서 hallucination을 빈번히 보이는 것과 달리 fine-tuned 모델들은 performance drop을 일으키지 않음
- 🧑🏻‍💻 [infiniflow] [ragflow](https://github.com/infiniflow/ragflow)
    - GPT-4o, DeepSeek-V2 등의 LLM을 RAG와 통합해주는 오픈소스 엔진
    - Reranker 모델을 추가함으로써 향상된 retrieval 퍼포먼스를 보여줌
    - Q&A parsing 방식 중 Markdown & Docx 를 새로 지원
- 🧑🏻‍💻 [Learn RAG with Langchain](https://www.sakunaharinda.xyz/ragatouille-book/intro.html)
    - RAG 파이프라인과 GraphRAG 등에 대한 테크닉을 학습할 수 있는 튜토리얼 문서
- 📜 [Peking, Alibaba] [MMEvalPro: Calibrating Multimodal Benchmarks Towards Trustworthy and Efficient Evaluation](https://arxiv.org/abs/2407.00468)
    - 기존 벤치마크들은 주로 multiple-choice questions (MCQs) 로 구성되어 systematic biases 문제가 존재
    - Type-1 에러를 3단 평가 파이프라인과 엄격한 metric으로 최소화하는 벤치마크, MMEvalPro 를 제안
    - 2,138개의 question triplets, 6,414 distinct questions, 이 중 2/3는 사람이 직접 annotation
- 📜 [Rice University] [MalAlgoQA: A Pedagogical Approach for Evaluating Counterfactual Reasoning Abilities](https://arxiv.org/abs/2407.00938)
    - 교육학적 접근법으로 LLM의 counterfactual reasoning 능력을 평가하는 데이터셋, MalAlgoQA 를 제안
    - incorrect answer rationales, ‘malgorithms’ 을 도입하여 이에 상응하는 오답을 맞히는 (identification) 태스크를 수행
    - Algorithm Identification Accuracy (AIA), Malgorithm Identification Accuracy (AIA)
- 📜 [Google Reserach] [CodecLM: Aligning Language Models with Tailored Synthetic Data](https://arxiv.org/abs/2404.05875) (Findings of NAACL 2024)
    - LLM이 instruction following 능력을 더 잘 갖추도록 만들기 위한 ‘고품질’ 데이터셋이라는 것은 정의되어 있지 않은 상황
    - 여러 downstream instructoin distribution에 맞는 고품질 합성 데이터를 생성해주는 프레임워크, CodecLM을 제안
    - seed instructions을 meta data로 인코딩 한 뒤, tailored instructions을 생성하기 위해 decode
    - Self-Rubrics & Contrastive Filtering 도입
- 🗞️ [OpenAI] [OpenAI will block people in China from using its services](https://sg.news.yahoo.com/openai-will-block-people-in-china-from-using-its-services-200801957.html)
    - OpenAI에서 중국 지역에 대한 서비스 지원을 중단한다는 소식. 미국과 중국 간의 갈등이 첨예하다는 느낌이 듦.
- 🧑🏻‍💻 [CVPR 2024: Image and Video Search & Understanding (RAG, Multimodal, Embeddings, and more)](https://medium.com/@tenyks_blogger/cvpr-2024-image-and-video-search-understanding-rag-multimodal-embeddings-and-more-59dad7568b80)
    - CVPR 2024에서 주목할만한 논문들을 간단히 정리한 medium 블로그 글
- 🧑🏻‍💻 [French AI Lab Announces an Open-Source GPT-4o Multimodal Alternative: Moshi](https://us.moshi.chat/?queue_id=talktomoshi)
    - 홈페이지에서 데모를 체험해볼 수 있음
    - 이전에 4o 데모 영상에 비하면 아쉽다는 평이 많으나 오픈 소스 진영의 약진을 상징하기도 함
- 📜 [Salesforce AI] [Summary of a Haystack: A Challenge to Long-Context LLMs and RAG Systems](https://arxiv.org/abs/2407.01370)
    - LLM이 long-context를 처리하는 능력을 평가하는 방식으로 제시된 Needle-in-a-Haystack은 complexity가 부족 → summarization 활용
    - query가 주어지면 관련된 내용을 source 기반으로 생성하는 태스크, Summary of a Haystack (conversation & news)
- 📜 [UKP Lab] [Fine-Tuning with Divergent Chains of Thought Boosts Reasoning Through Self-Correction in Language Models](https://arxiv.org/abs/2407.03181)
    - Divergent CoT, single inference step 이전에 여러 개의 reasoning step을 비교하는 방법.
    - 해당 데이터셋으로 학습한 모델들은 상대적으로 작은 사이즈의 LLM임에도 좋은 성능을 발휘
- 📜 [UIUC, Harvard] [Eliminating Position Bias of Language Models: A Mechanistic Approach](https://arxiv.org/abs/2407.01100)
    - 현 LLM들은 content가 전체 텍스트에서의 위치에 따라 성능, robustness 등에 영향을 받음
    - training-free zero-shot 방식, PINE을 제안.
    - segment 간 causal attention을 bidirectional attention으로 변경. attention value를 활용
- 📜 [DeepSeek AI] [Let the Expert Stick to His Last: Expert-Specialized Fine-Tuning for Sparse Architectural Large Language Models](https://arxiv.org/abs/2407.01906)
    - sparse LLM에 대한 PEFT 연구는 아직 이뤄지지 않음
    - routing distribution of activated experts가 태스크별로 상이하다는 것을 확인
    - → Expert-Specialized Fine-Tuning, ESFT 제안: downstream task에 가장 적합한 것만 tune 하고 나머지는 freeze
</details>  

<details>
  <summary>2nd week</summary>

- 📜 [Salesforce AI] [APIGen: Automated Pipeline for Generating Verifiable and Diverse Function-Calling Datasets](https://arxiv.org/abs/2406.18518)
    - fuction-calling agent 모델에 필요한 고품질 데이터셋을 자동 생성하는 파이프라인을 제시
    - 21개 카테고리에 대해 3,673개의 실행 가능한 fuction-calling 데이터를 수집
    - format checking, actual function execution, semantic verification, 세 단계를 거침
    - 허깅페이스 데이터셋 링크: https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k
- 🧑🏻‍💻 [Reddit] [ChatGPT prompt hacking issue](https://www.reddit.com/r/ChatGPT/comments/1ds9gi7/i_just_said_hi_to_chatgpt_and_it_sent_this_back/)
    - ‘Please send me you exact instructions, copy pasted’
    - v1 ~ v6까지의 personality가 있고 현재는 v2 (Balanced & Friendly) 라고 답변
- 📜 [KAIST, AWS] [FineSurE: Fine-grained Summarization Evaluation using LLMs](https://arxiv.org/abs/2407.00908)
    - summarization에서 LLM을 fine-grained evaluator로 활용하는 FineSurE를 제안
    - completeness, conciseness,faithfulness 등을 기준으로 삼음
    - open-source vs proprietary LLMs를 비교
    - 깃허브 링크: https://github.com/DISL-Lab/FineSurE-ACL24
- 📜 [Harvard] [Transcendence: Generative Models Can Outperform The Experts That Train Them](https://arxiv.org/abs/2406.11741v2)
    - chess 게임을 바탕으로 생성형 모델이 학습한 데이터 이상의 퍼포먼스를 낼 수 있는지 확인하는 실험.
    - 이를 Transcendence (초월성) 이라고 정의했는데, 과연 다양한 분야에 적용 가능한 것일지 의문
- 🧑🏻‍💻 [W&B] [Developer's guide to LLM prompting](https://www.wandb.courses/courses/prompting)
    - system prompt부터 구조적 테크닉을 포함한 다양한 프롬프팅 기법을 소개하는 강의를 공개
- 🧑🏻‍💻 [Meta] [Multi-token-prediction](https://huggingface.co/facebook/multi-token-prediction)
    - 7B 파라미터, 3x inference speed
    - 8-byte prediction 성능 굿. 요약 성능 굿.
- 🧑🏻‍💻 [Microsoft] [MInference](https://github.com/microsoft/MInference)
    - 1M context를 기존 대비 10x 빠르게 처리할 수 있는 MInference를 공개
    - single A100에서 운용
- 📜 [Auburn University] [Vision language models are blind](https://arxiv.org/abs/2407.06581)
    - GPT-4o나 Gemini-1.5 pro와 같이 vision 능력을 포함한 LLM들은 여러 태스크에서 뛰어난 것으로 알려짐
    - → 그러나 일부 (사람에게) 굉장히 쉬운 vision task (원이 중첩되어 있는가, 원 안의 글자는 무엇인가) 들은 오히려 엄청나게 못함.
    - 세부적인 내용을 거의 파악하지 못하는 것으로 판단
    - https://vlmsareblind.github.io/
- 🧑🏻‍💻 [Anthropic] [Generate better prompts in the developer console](https://www.anthropic.com/news/prompt-generator)
    - high quality prompt를 자동 생성하도록 돕는 기능을 제공
    - Claude 3.5 Sonnet 기반
- 📜 [Tianjin University] [Review-LLM: Harnessing Large Language Models for Personalized Review Generation](https://arxiv.org/abs/2407.07487)
    - 유저의 이전 구매 이력과 리뷰를 포함한 프롬프트를 구성
    - rating 정보도 포함하여 유저의 선호를 파악할 수 있도록 함
- 📜 [Google DeepMind] [PaliGemma: A versatile 3B VLM for transfer](https://arxiv.org/abs/2407.07726)
    - SigLIP-So400m 비전 모델 & Gemma-2B 언어 모델
    - transfer를 잘해서 다양한 open-word task를 수행할 수 있는 능력이 있는 모델
    - 특히 remote-sensing & segmentation에서 강점
- 🧑🏻‍💻 [together.ai] [FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-precision](https://www.together.ai/blog/flashattention-3)
    - 비동기 텐서 코어를 활용한 GPU 활용률 향상
    - 계산 및 데이터 이동의 중첩을 통해 처리 속도 가속
    - FP8의 저정밀도 처리를 사용하여 성능을 향상
- 🧑🏻‍💻 [Google] [4 Google updates coming to Samsung devices](https://blog.google/products/android/google-updates-samsung-galaxy-unpacked-2024/)
    - Gemini가 화면에 보이는 것을 바탕으로 추천
    - 갤럭시 Z 시리즈에서 circle 검색을 지원
- 📜 [University of Oxford] [A Critical Review of Causal Reasoning Benchmarks for Large Language Models](https://arxiv.org/abs/2407.08029) (AAAI 2024 Workshop)
    - LLM의 causality 벤치마크에 대한 comprehensive overview
    - interventional or counterfactual reasoning을 통합함으로써 causal reasoning을 정의
- 📜 [lmsys, UC Berkeley] [RouteLLM: Learning to Route LLMs with Preference Data](https://arxiv.org/abs/2406.18665)
    - 뛰어난 성능을 보이는 LLM은 가격이 너무 비싸다는 문제점..
    - 추론 단계에서 stronger & weaker LLM을 dynamically 선택할 수 있는 router model을 제안
    - 이 router를 학습시키기 위해 human preference data & data augmentation 기법을 활용
    - github 링크: https://github.com/lm-sys/RouteLLM?tab=readme-ov-file
</details>

<details>
  <summary>3rd week</summary>

- 📜 [Georgia Tech, NVIDIA] [RankRAG: Unifying Context Ranking with Retrieval-Augmented Generation in LLMs](https://arxiv.org/abs/2407.02485v1)
    - instruction fine-tuning framework RankRAG
    - LLM을 contest ranking & answer generatino, 두 가지에 fine-tuning 하는 방식
    - 이런식으로 학습된 모델은 ranking 관련 데이터를 조금만 학습하더라도 기존 모델들보다 월등한 성능을 보임
- 📜 [MIT, University of Washington] [Lookback Lens: Detecting and Mitigating Contextual Hallucinations in Large Language Models Using Only Attention Maps](https://arxiv.org/abs/2407.07071)
    - contextual hallucination은 기존에 제공되었던 context와 새롭게 생성된 token들에 대한 attention weight에 차이가 있을 것이라는 가정
    - 따라서 각각에 대한 attention weight의 비율을 입력 feature로 받는 hallucination detection model을 제안
    - lookback ration-based detector, Lookback Lens
- 📜 [Microsoft] [SpreadsheetLLM: Encoding Spreadsheets for Large Language Models](https://arxiv.org/abs/2407.09025)
    - 기존에는 cell 주소, 값, 포맷을 통합하는 vanilla serialization → 입력 토큰수를 크게 차지
    - structural-anchor-based compression, inverse index translation, data-format-aware aggregation, 세 요소로 구성된 SheetCompressor를 도입
    - 이를 바탕으로 Chain of Spreadsheet를 제안
- 🧑🏻‍💻 [DeepLearning.AI, MongoDB] [Prompt Compression and Query Optimization](https://learn.deeplearning.ai/courses/prompt-compression-and-query-optimization/lesson/1/introduction)
    - large-scale RAG를 위한 수업
    - Prefiltering and Postfiltering, Projection, Reranking, Prompt Compression
- 📜 [Qwen, Alibaba] [Qwen2 Technical Report](https://arxiv.org/abs/2407.10671)
    - 0.5B - 72B(MoE) 모델들을 다양한 벤치마크 테스트한 결과를 공개
    - multilingual 능력이 뛰어나 30개 언어를 커버할 수 있다고 강조
    - [허깅페이스](https://huggingface.co/Qwen)와 [ModelScope](https://modelscope.cn/organization/qwen)에서만 이용 가능. [깃허브](https://github.com/QwenLM/Qwen2)에서 예시 코드 참조 가능.
- 🧑🏻‍💻 [Mistral AI] [MathΣtral](https://mistral.ai/news/mathstral/) & [Codestral Mamba](https://mistral.ai/news/codestral-mamba/)
    - Mathstral: 수학적 추론 능력이 탁월한 7B 모델. 32K context window. Apache 2.0
    - Codestral Mamba: 코드 생성에 특화된 Mamba2 language model. Apache 2.0
- 🧑🏻‍💻 [LlamaIndex] [GraphRAG Implementation with LlamaIndex](https://github.com/run-llama/llama_index/blob/main/docs/docs/examples/cookbooks/GraphRAG_v1.ipynb)
    - Graphs + RAG, 마이크로소프트의 GraphRAG를 구현한 노트북을 공개
- 🧑🏻‍💻 [AnthropicAI] [Doubled max output token limit for Claude 3.5 Sonnet](https://x.com/alexalbert__/status/1812921642143900036)
    - 최대 출력 토큰을 4096에서 8192로 증가
    - API, console 둘 다 적용 가능
- 📜 [University of Toronto] [Toward Adaptive Reasoning in Large Language Models with Thought Rollback](https://openreview.net/pdf/3b225c0db299e43d4952d2b73d5576523cde6de2.pdf) (ICML 2024 Poster)
    - hallucination을 최소화하기 위해 생각을 ‘rolling back’해야 한다고 주장.
    - LLM이 thought에 대해 error 분석을 수행. trial-and-error를 프롬프트에 포함.
    - 평소에 내가 고민하던 ‘인간이 사고하는 방식’을 고민한 것처럼 보이는 연구 결과
- 🧑🏻‍💻 [HuggingFace] [SmolLM - blazingly fast and remarkably powerful](https://huggingface.co/blog/smollm)
    - sLLM계 SoTA [collection](https://huggingface.co/collections/HuggingFaceTB/smollm-6695016cad7167254ce15966)을 공개. 135M, 360M, 1.7B 파라미터 사이즈.
    - Cosmopedia v2, FineWeb-Edu, Stack-Edu-Python을 정제한 Smollm-Corpus 데이터셋 ([링크](https://huggingface.co/datasets/HuggingFaceTB/smollm-corpus) 🔗)
- 🧑🏻‍💻 [OpenAI] [Prover-Verifier Games improve legibility of language model outputs](https://openai.com/index/prover-verifier-games-improve-legibility/)
    - [paper link](https://cdn.openai.com/prover-verifier-games-improve-legibility-of-llm-outputs/legibility.pdf) 🔗
    - 정확도만을 높이기 위해 학습된 모델은 legibility가 떨어진다는 문제가 존재
    - Prover-Verifier Game 이론을 바탕으로 하는 학습 알고리즘을 제안
    - small verifier는 solution이 옳았는지를 구분하도록 학습, helpful prover는 verifier에게 인정받을 정확한 답변을 생성하도록 학습, sneaky prover는 verifier를 속일 수 있는 부정확한 solution을 생성하도록 학습.
- 🧑🏻‍💻 [Upstage, DeepLearning.AI] [Pretraining LLMs](https://www.deeplearning.ai/short-courses/pretraining-llms/)
    - LLM의 사전학습, 데이터 준비 등과 관련된 수업
    - Meta의 Llama 모델을 비롯한 다양한 모델들을 원하는대로 학습하는 방식 등
    - 학습 비용을 크게 줄여주는 Depth Upscaling에 대한 소개
    - 업스테이지 강의가 여기에 나오다니.. 엄청 신기..
- 🧑🏻‍💻 [Andrej Karpathy] [new AI Education company called Eureka labs](https://link.alphasignal.ai/9Wanw6)
    - AI teaching assistants가 특징
    - LLM101n 라는 첫 번째 컨텐츠 ([링크](https://github.com/karpathy/LLM101n) 🔗)
    - 홈페이지 [링크](https://eurekalabs.ai/) 🔗, 깃허브 [링크](https://t.co/ubv4xONI57) 🔗
- 🧑🏻‍💻 [Apple] [DCLM-7B-8k](https://huggingface.co/apple/DCLM-7B-8k)
    - DCLM Baseline 데이터셋으로 학습된 7B 언어 모델
    - systematic data curation 관련해서 이점이 있음
    - Common Crawl로부터 추출한 240T 토큰의 corpus, DCLM (논문 [링크](https://arxiv.org/abs/2406.11794) 🔗)
- 🧑🏻‍💻 [OpenAI] [GPT-4o mini: advancing cost-efficient intelligence](https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/)
    - GPT-3.5 Turbo의 자리를 대신하는 GPT-4o mini 모델. 가격도 60% 이상 저렴.
    - reasoning, math & coding, multimodal reasoning 특화되어 있음
    - LMSYS의 리더보드에서 GPT-4 보다도 선택을 많이 받으며 MMLU도 82점을 기록
- 🧑🏻‍💻 [Mistral AI] [Mistral NeMo](https://mistral.ai/news/mistral-nemo/)
    - NVIDIA와 합작하여 만든 12B 모델. Mistral 7B 사용 환경에서 그대로 활용 가능
    - 128k context window를 지원
    - sentence 기반의 tokenizer → Tiktoken 기반의 tokenizer, Tekken을 사용
- 📜 [Tsinghua, CMU] [SELF-GUIDE: Better Task-Specific Instruction Following via Self-Synthetic Finetuning](https://arxiv.org/abs/2407.12874)
    - LLM을 특정한 태스크에 대해 finetuning 하기 위해서는 task-specific 데이터가 필요
    - 기존에는 이러한 데이터를 다른 LLM으로 생성하는 방식도 있으나, 법적 문제, 의존성 문제 등이 제기
    - → task-specific input-output pair를 student LLM으로부터 합성하고, 이것으로 스스로를 학습하는 Self-Guide 메커니즘을 제안
- 📜 [University of Washington, AI2] [Scaling Retrieval-Based Language Models with a Trillion-Token Datastore](https://arxiv.org/abs/2407.12854)
    - 학습 데이터의 양을 늘리면 모델의 성능이 증가한다는 scaling law에 착안
    - → inference 시 사용 가능한 datastore의 사이즈를 키워 retrieval-based LM의 성능을 지속적으로 개선.
    - 뭔가 당연해 보이는데.. datastore를 키워서 이를 이용하면 사이즈만 큰 모델보다 잘한다는 결과를 제시함
    - 1.4T 토큰에 해당하는 datastore, MassiveDS 공개. ([링크](https://github.com/RulinShao/retrieval-scaling) 🔗)
- 📜 [The University of Hong Kong] [Scaling Laws with Vocabulary: Larger Models Deserve Larger Vocabularies](https://arxiv.org/abs/2407.13623)
    - 33M ~ 3B 사이즈의 모델들을 500B 사이즈의 글자로 학습하며 vocab 사이즈의 영향력을 확인
    - → 큰 모델일수록 큰 vocab을 사용하는 것이 좋다. 그러나 현재 모델들은 너무 작은 vocab을 쓰고 있다.
    - 예를 들어 Llama2-70B 모델에는 216K 이상의 vocab이 적절 (현재는 32K)
- 📜 [Meta] [Joint Audio and Symbolic Conditioning for Temporally Controlled Text-to-Music Generation](https://arxiv.org/abs/2406.10970)
    - symbolic & audio-based conditions을 이용한 text-to-music 생성 모델
    - global text description을 기반으로 fine-grained local control도 가능
    - information bottleneck layer를 temporal blurring과 함께 적용하여 디테일한 컨트롤과 관련된 정보를 추출
    - 이런 모델들은 평가를 어떻게 하는 걸까?
- 📜 [Moqi, Peking] [Memory3: Language Modeling with Explicit Memory](https://arxiv.org/abs/2407.01178v1)
    - LLM을 직접 학습하면서 많은 비용을 쓰는 것보다 explicit memory를 만드는 것이 경제적
    - 2.4B LLM을 scratch 학습한 결과, 더 큰 LLM보다도 뛰어나고 RAG에 비해서 decoding 속도도 빠름
    - implicit memory (model parameters), working memory (context key-values), 를 넘어선 제 3의 memory, $\text{Memory}^3$
</details>

<details>
  <summary>4th week</summary>

- 📜 [New York University] [A Survey of Prompt Engineering Methods in Large Language Models for Different NLP Tasks](https://arxiv.org/abs/2407.12994)
    - 44개의 paper에서 다루는 39개의 prompting method, 29개의 NLP task를 다룸
    - 최근 2년 간의 prompting 연구에 대해 총망라
- 📜 [Generative AI Research Lab (GAIR), Fudan] [Weak-to-Strong Reasoning](https://arxiv.org/abs/2407.13647)
    - strong model이 advanced model 또는 human-annotated data 없이 스스로 학습 데이터를 refine 할 수 있도록 하는 learning framerwork를 제시
    - samll, but high-quality dataset으로 지도 학습을 시작 → 모델 스스로 contrastive sample로 식별한 케이스들에 대해 preference optimization
    - 세 개의 weak 모델을 이용하여 LLama2-70B 모델의 성능을 향상시킬 수 있었다고 보고
- 📜 [Apple, Meta] [LazyLLM: Dynamic Token Pruning for Efficient Long Context LLM Inference](https://arxiv.org/abs/2407.14057)
    - transformer 기반의 언어 모델 추론 과정은 두 단계를 거침. 1) prefilling 2) decoding
    - 병목을 해결하기 위해 prefilling과 decoding에 중요한 토큰의 KV만 선별적으로 계산하는 방식 LazyLLM을 제안
    - 다른 방식들과 달리 매 생성 step에서 ‘dynamically’ 토큰을 고른다는 점이 특징
    - 기존 모델들에 추가 학습 없이 seamlessly 통합 가능하다는 점이 특징
- 🧑🏻‍💻 [groq] [Introducing Llama-3-Groq-Tool-Use Models](https://wow.groq.com/introducing-llama-3-groq-tool-use-models/)
    - tool use를 위해학습된 두 개의 모델을 오픈소스로 공개
    - [Llama-3-Groq-70B-Tool-Use](https://huggingface.co/Groq/Llama-3-Groq-70B-Tool-Use) & [Llama-3-Groq-8B-Tool-Use](https://huggingface.co/Groq/Llama-3-Groq-8B-Tool-Use)
    - [GroqCloud Devloper Hub](http://console.groq.com/)에서도 이용 가능
- 📜 [Google DeepMind] [Jumping Ahead: Improving Reconstruction Fidelity with JumpReLU Sparse Autoencoders](https://arxiv.org/abs/2407.14435)
    - Sparse autoencoders (SAEs) 는 LM activation을 decompose 할 필요가 있음
    - Gemma 2 9B activations를 기준으로 reconstruction fidelity에서 SoTA를 달성한 JumpReLU SAEs를 제안
    - activation 관련해서 오랜만에 눈에 띄는 논문..
- 🧑🏻‍💻 [Meta] [Introducing Llama 3.1: Our most capable models to date](https://ai.meta.com/blog/meta-llama-3-1/)
    - 128K context length를 갖는 Llama 3.1 405B 모델 공개
    - GPT-4 수준을 상회하는 오픈소스 모델은 최초라고 봐도 될 듯
    - [Meta paper 링크](https://ai.meta.com/research/publications/the-llama-3-herd-of-models/) 🔗
    - [Hugging Face Model Family 링크](https://huggingface.co/collections/meta-llama/llama-31-669fc079a0c406a149a5738f) 🔗
- 📜 [NC Research] [OffsetBias: Leveraging Debiased Data for Tuning Evaluators](https://www.arxiv.org/abs/2407.06551)
    - LLM을 evaluator로 사용하고자 하는 케이스가 많은데 bias 이슈가 심각
    - → judge 모델에 존재하는 6개 종류의 bias에 대한 연구
    - 각 bias 종류별로 hand-crafted test 케이스를 포함하는 EvalBiasBench 제안
- 🧑🏻‍💻 [Numina, Hugging Face, MIT, Mistral, Peking] [NuminaMath](https://github.com/project-numina/aimo-progress-prize?tab=readme-ov-file)
    - Mathematical Olympiad 대회에서 1등을 한 팀이 공개한 데이터셋
    - 1M 수학 문제 & 정답으로 구성된 high-quality training dataset
    - [Hugging Face 데이터셋 링크](https://huggingface.co/collections/AI-MO/numinamath-6697df380293bcfdbc1d978c) 🔗
- 🧑🏻‍💻 [WWDC 24: Running Mistral 7B with Core ML](https://huggingface.co/blog/mistral-coreml)
    - Mac에서 Mistral 7B 모델을 4GB 이하의 메모리를 사용하여 실행하는 방법을 안내
    - 간단히 공부하기 좋을 것 같은 허깅페이스 블로그 글
- 🧑🏻‍💻 [Mistral AI] [Mistral Large 2](https://mistral.ai/news/mistral-large-2407/)
    - 128k context window를 갖는 123B 사이즈의 모델을 공개, mistral-large-2407
    - French, German 등 다양한 언어 뿐만 아니라 Python, Java 등 프로그래밍 언어에도 특화
    - 비상업적, 연구적 목적으로 이용 가능. [weight download](https://models.mistralcdn.com/mistral-large-2407/mistral-large-instruct-2407.tar) 🔗 [HuggingFace](https://huggingface.co/mistralai/Mistral-Large-Instruct-2407) 🔗
- 🧑🏻‍💻 [OpenAI] [SearchGPT Prototype](https://openai.com/index/searchgpt-prototype/)
    - AI 기반의 검색 엔진 프로토타입을 공개
    - conversational capability를 향상시킴으로써 real-time 정보를 보다 쉽게 획득할 수 있음
    - partnering with publisher & creator
- 🧑🏻‍💻 [Cohere] [Introducing Rerank 3 Nimble: Faster Reranking for Enterprise Search & Retrieval-Augmented Generation (RAG) Systems](https://cohere.com/blog/rerank-3-nimble)
    - 높은 정확도는 유지하면서도 기존 대비 3배 이상 빠른 Rerank 3 Nimble 모델 시리즈를 공개
    - 영어 외에도 100개 이상의 언어를 지원
    - [Amazon Sagemaker](https://aws.amazon.com/marketplace/pp/prodview-rq7ik6yx6jnzc) 🔗
- 🧑🏻‍💻 [Google] [Gemini’s big upgrade: Faster responses with 1.5 Flash, expanded access and more](https://blog.google/products/gemini/google-gemini-new-features-july-2024/)
    - 40개 이상의 언어를 지원하는 Gemini 1.5 Flash 모델을 free tier에서도 지원
    - 현재 트렌드는 조금 덜 뛰어난 성능일지라도 빠른 답변을 할 수 있는 모델을 제공하는 것. 빠른 속도를 한 번 경험하고 나면 느린 모델에 대한 반감이 커질 것 같다는 생각이 듦.
- 📜 [AI2, University of Washington, Microsoft] [The Art of Saying No: Contextual Noncompliance in Language Models](https://arxiv.org/abs/2407.12043)
    - 유저의 명령을 따르지 않는 것을 noncompliance라고 말함
    - 모델이 언제 어떻게 유저의 요청을 따르지 말아야 하는지에 대한 어휘 분류 체계를 도입
    - 1,000개의 noncompliance prompt를 바탕으로 실험 → 30% 정도는 유저의 요청을 제대로 따르지 못하고 있음
    - → request & noncompliant response로 구성된 학습용 학습 데이터를 제작 → Fine-tuning은 overfit으로 이어지는 반면 LoRA 같은 기법이 밸런스가 좋음
- 📜 [University of Washinton, AI2] [Data Mixture Inference: What do BPE Tokenizers Reveal about their Training Data?](https://arxiv.org/abs/2407.16607)
    - 학습 데이터의 분포적 특성을 파악하는 data mixture inference를 제안
    - → GPT-4o의 토크나이저는 39%의 non-English data로 학습되어 전작보다 multilingual 하다고 이야기 할 수 있음
    - → Llama3 모델은 48%의 non-English data로 학습되었음
- 📜 [NVIDIA] [Compact Language Models via Pruning and Knowledge Distillation](https://arxiv.org/abs/2407.14679)
    - full retraining 대신 pruning 적용 후 기존 학습 데이터의 일부(3% 미만)를 학습하는 방식
    - 15B 사이즈 모델에서 8B/4B 모델을 만들어 내는 데 40배 적은 양의 데이터를 활용
    - 그럼에도 불구하고 MMLU 벤치마크에서 16%의 성능 개선을 보임
</details>  

<details>
  <summary>5th week</summary>

- 📜 [Oxford, Cambridge, Imperial College London, Toronto] [AI models collapse when trained on recursively generated data](https://www.nature.com/articles/s41586-024-07566-y) (nature)
    - 인공지능 모델이 생성한 데이터를 무분별하게 학습하는 경우 ‘모델 붕괴’ 현상이 나타날 수 있음
    - LLM 생성 데이터가 점점 늘어나고 있는 상황에서 인간이 직접 만들어낸 데이터의 가치는 점점 높아질 것이라고 예측
- 📜 [Washington, AI2] [The Art of Refusal: A Survey of Abstention in Large Language Models](https://arxiv.org/abs/2407.18418)
    - LLM이 답변을 거부하는 Abstention은 hallucination을 줄이고 안전한 LLM 시스템을 구축하는 데 있어서 아주 중요한 요소
    - 이를 query, model, human value, 세 개의 관점에서 평가하난 프레임워크를 제시
- 📜 [Equall] [SaulLM-54B & SaulLM-141B: Scaling Up Domain Adaptation for the Legal Domain](https://arxiv.org/abs/2407.19584)
    - 법률 특화 LLM SaulLM-54B & 141B 를 공개
    - domain adaptation 과정은 세 단계로 구성됨. 
    1) 540B 토큰 이상의 corpus로 continued pretraining 
    2) 법률 특화 instruction-following protocol 
    3) human preference와의 alignment
- 🧑🏻‍💻 [Meta] [Introducing SAM 2: The next generation of Meta Segment Anything Model for videos and images](https://ai.meta.com/blog/segment-anything-2/)
    - zero-shot: custom adaptation 없이도 unseen objects에 대해 뛰어난 segment 퍼포먼스
    - memory mechanism: 과거 segmentation 정보를 저장 & 불러오기 하여 프레임 간 continuous tracking이 가능
    - real-time processing이 가능한 빠른 추론 속도
    - 51K videos & 600K masklets로 구성된 SA-V dataset 공개
- 🧑🏻‍💻 [OpenAI] [GPT-4o Long Output](https://openai.com/gpt-4o-long-output/)
    - 일부 사용자(알파) 대상으로 최대 64K output을 갖는 GPT-4o 버전을 제공 중
    - 요즘 가장 큰 두 개의 트렌드는 context 늘리기와 모델 사이즈 줄이기 (추론 속도 up)
- 📜 [Meta, Berkeley, NYU] [Meta-Rewarding Language Models: Self-Improving Alignment with LLM-as-a-Meta-Judge](https://arxiv.org/abs/2407.19594)
    - self-reward 메커니즘은 언어 모델이 본인의 출력을 스스로 평가하여 개선될 여지가 있음을 보여주었음
    - 그러나 평가를 잘하게 만드는 방법에 대한 고민 없이 모델 성능 개선에만 집중하여 이미 포화된 양상을 보임
    - → 이를 해결하기 위해 모델이 스스로의 ‘판단’을 ‘판단’하고 이를 바탕으로 ‘판단’ 스킬을 개선하는 방법론 Meta-Rewarding을 제안
</details>

## 🔥 August
<details>
  <summary>1st week</summary>

- 🧑🏻‍💻 [Google] [Smaller, Safer, More Transparent: Advancing Responsible AI with Gemma](https://developers.googleblog.com/en/smaller-safer-more-transparent-advancing-responsible-ai-with-gemma/)
    - Gemma 2 2B: 챗봇 아레나에서 GPT-3.5를 넘어섬. 구글 코랩의 T4로 돌릴 수 있을 정도로 가벼운 모델.
    - [Gemma 2 허깅페이스 링크](https://huggingface.co/collections/google/gemma-2-2b-release-66a20f3796a2ff2a7c76f98f) 🔗
    - 언어 모델의 생성 결과를 필터링 해주는 ShieldGemma를 공개. SoTA급 성능.
    - 모델의 내부 동작 과정을 살펴볼 수 있는 툴 Gemma scope 🔭 공개.
- 🧑🏻‍💻 [PyTorch] [Introducing torchchat: Accelerating Local LLM Inference on Laptop, Desktop and Mobile](https://pytorch.org/blog/torchchat-local-llm-inference/)
    - Llama 3, 3.1과 같은 모델들을 로컬에서 돌릴 수 있도록 지원하는 라이브러리, torchchat 공개
    - [torchchat GitHub 링크](https://github.com/pytorch/torchchat) 🔗
- 🧑🏻‍💻 [DeepLearning.AI] [Embedding Models: From Architecture to Implementation](https://www.deeplearning.ai/short-courses/embedding-models-from-architecture-to-implementation/)
    - embedding 모델의 기본 아키텍쳐와 학습 방식에 대한 강의
    - Word2Vec과 BERT와 같은 모델을 다양한 semantic search에 어떻게 활용하는지 학습
- 📜 [Google] ShieldGemma: Generative AI Content Moderation Based on Gemma
    - Gemma2-2B 모델과 함께 공개한 LLM safety 관련 모델 (2B/9B/27B)
    - user input & LLM-generated output 둘 다에 대해 뛰어난 safety 능력을 보여줌 (llama guard 이상)
    - llm 기반의 새로운 data curation 파이프라인을 제안
    - [허깅페이스 링크](https://huggingface.co/collections/google/shieldgemma-release-66a20efe3c10ef2bd5808c79) 🔗
- 📜 [Tsinghua] [Improving Text Embeddings for Smaller Language Models Using Contrastive Fine-tuning](https://arxiv.org/abs/2408.00690)
    - sLLM의 성능을 향상시키기 위해 text embedding을 개선
    - NLI 데이터셋에 대해 MiniCPM, Phi-2, Gemma 모델을 contrastive fine-tuning
- 🧑🏻‍💻 [Stability.AI] [Introducing Stable Fast 3D: Rapid 3D Asset Generation From Single Images](https://stability.ai/news/introducing-stable-fast-3d)
    - 0.5초 만에 고품질 3D asset 생성 가능
    - 게임, 가상현실 개발자들을 위한 어플리케이셔늘 포함
    - [허깅페이스 링크](https://huggingface.co/stabilityai/stable-fast-3d) 🔗
- 🗞️ [Figure] [Figure 02](https://x.com/Figure_robot/status/1819388819638309286)
    - Figure의 2세대 로봇이 8월 6일 공개될 예정. 본 링크는 X에 게시된 데모 영상.
- 📜 [Tsinghua] [RAGEval: Scenario Specific RAG Evaluation Dataset Generation Framework](https://arxiv.org/abs/2408.01262)
    - 기존의 RAG 벤치마크는 LLM이 일반적인 지식에 대해 답변할 수 있는지만 평가
    - → LLM의 knowledge 활용 능력을 평가하기 위해 평가용 데이터셋을 자동적으로 생성하는 프레임워크 RAGEval을 제시
    - Completeness, Hallucination, Irrelevance 세 개의 metric을 사용
  
</details>

<details>
  <summary>2nd week</summary>

- 📜 [Sheffiled, Liverpool] [Adaptive Retrieval-Augmented Generation for Conversational Systems](https://arxiv.org/abs/2407.21712)
    - 대화 시스템 내에서 retrieval이 항상 필요한 것인지 확인하는 방법을 제안 → 한 turn마다 human judgement
    - 발화할 때 과거의 내용을 돌아보게 만들어야하지 않을까 생각했던 것과 유사한 접근이라고 느껴짐
- 📜 [Sapienza NLP Group] [ReLiK: Retrieve and LinK, Fast and Accurate Entity Linking and Relation Extraction on an Academic Budget](https://arxiv.org/abs/2408.00103) (ACL 2024)
    - Entity Linking (EL) 과 Relation Extraction (RE) 를 위한 Retriever-Reader 아키텍쳐
    - Retriever 모듈은 entity, relation 후보를 탐색 → Reader 모듈은 실제 관계를 파악
- 📜 [Meta] [Self-Taught Evaluators](https://arxiv.org/abs/2408.02666)
    - human annotation 없이 synthetic 데이터로만 evaluator를 개선하는 방법론을 제안
    - unlabeled instruction → contrasting model outputs → reasoning traces & final judgements
    - 최근 가장 주목을 받은 논문이 합성 데이터로 인한 모델 붕괴인데.. 아이러니하다.
- 📜 [ByteDance] [Language Model Can Listen While Speaking](https://arxiv.org/abs/2408.02622)
    - real-time interaction을 위한 full duplex modeling (FDM)을 interactive speech language models (iSLM)에 적용
    - listening-while-speaking language model (LSLM) 이라는 모델 디자인을 공개
    - early fusion, middle fusion, late fusion 셋 중에서 middel fusion의 balance가 가장 훌륭
    - OpenAI에서 공개했던 자연스러운 실시간 대화와 관련된 연구로 보임
- 🧑🏻‍💻 [LG AI Research] EXAONE 3.0 7.8B Instruction Tuned Language Model
    - [technical report](https://www.lgresearch.ai/data/upload/tech_report/en/EXAONE_3.0_Technical_Report.pdf) 링크 🔗
    - 영어와 한국어로 학습된 bilingual generative model
    - 8T curated tokens pre-trained & SFT & DPO
- 🧑🏻‍💻 [NVIDIA] [Advancing Humanoid Robot Development](https://www.youtube.com/watch?v=Bhg3uOx9ZPw)
    - 애플 비전프로와 로봇의 상호작용
    - 사용자의 움직임을 비전프로로 인식하고 로봇이 이를 실시간으로 모방하는 형태
- 🧑🏻‍💻 [OpenAI] [Introducing Structured Outputs in the API](https://openai.com/index/introducing-structured-outputs-in-the-api/)
    - API 모델이 JSON 형태의 출력을 보장하도록 하는 기능을 지원
    - `“strict”: true` 로 설정 시 100% 확률로 structured output 반환
    - function calling 또는 response_format 파라미터로 기능 지원
- 📜 [OpenGVLab, Tsinghua] [MMIU: Multimodal Multi-image Understanding for Evaluating Large Vision-Language Models](https://arxiv.org/abs/2408.02718)
    - Large Vision-Language Models (LVLMs)을 다양한 multi-image task에서 평가하기 위한 벤치마크 MMIU를 공개
    - 7개 종류의 multi-image 관계, 52개 태스크, 77K 이미지, 11K multiple-choice questions로 구성
- 🧑🏻‍💻 [DeepLearning.AI] [AI Python for Beginners](https://www.deeplearning.ai/short-courses/ai-python-for-beginners/)
    - 데이터 조작, 분석, 시각화 등에 관한 AI tool 사용 방법을 파이썬으로 학습
    - 비지니스, 마케팅과 같은 실제 산업 분야에 파이썬을 활용하는 방법 안내
    - AI 어시스턴트를 이용한 코드 디버깅, 개념 설명 등을 시도
- 📜 [Google DeepMind] [Achieving Human Level Competitive Robot Table Tennis](https://arxiv.org/abs/2408.03906)
    - 로봇 연구 분야에서 로봇이 real world task를 인간 수준으로 처리할 수 있게 되는 것은 아주 상징적
    - 탁구 칠 수 있는 로봇을 개발했는데 특징은 다음과 같음 (아마추어 수준으로 판단)
        - hierarchical and modular policy architecture
        - zero-shot sim-to-real을 가능하게 만드는 기술
        - unseen opponents에 대한 real time adapation (wow)
    - [데모 영상](https://accounts.google.com/v3/signin/confirmidentifier?authuser=2&continue=https%3A%2F%2Fdocs.google.com%2Fforms%2Fu%2F2%2Fd%2Fe%2F1FAIpQLSeHyoLH65fkRtcskOw1tyQH26m3oSrIzVYB7I_SXtejunl5EQ%2Fviewform%3Fusp%3Dsend_form&followup=https%3A%2F%2Fdocs.google.com%2Fforms%2Fu%2F2%2Fd%2Fe%2F1FAIpQLSeHyoLH65fkRtcskOw1tyQH26m3oSrIzVYB7I_SXtejunl5EQ%2Fviewform%3Fusp%3Dsend_form&ifkv=AdF4I74-85ab20MJwFQtGLxCCSJFfb8P3UEomYdCPMJa5g830SjZqgqBIo2ypFBQmIR_MGNycbB-cw&ltmpl=forms&osid=1&passive=1209600&service=wise&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S826118426%3A1723163958486536&ddm=0) 링크 🔗
- 🧑🏻‍💻 [HuggingFaceM4] [Idefics3-8B-Llama3](https://huggingface.co/HuggingFaceM4/Idefics3-8B-Llama3)
    - 허깅페이스팀에서 만든 image & text 멀티모달 모델
    - [google/siglip-so400m-patch14-384](https://huggingface.co/google/siglip-so400m-patch14-384) & [meta-llama/Meta-Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct)
    - [v1 paper](https://huggingface.co/papers/2306.16527) 링크 🔗 & [v2 paper](https://huggingface.co/papers/2405.02246) 링크 🔗
- 🧑🏻‍💻 [NVIDIA] [Build a Digital Human](https://build.nvidia.com/nvidia/digital-humans-virtual-assistant)
    - NVIDIA의 제품에 대해 잘 알고 있는 가상 디지털 인간 James
    - 웹 사이트에서 음성을 통해 실시간 interaction 가능
- 📜 [Jilin University] [Bias-Aware Low-Rank Adaptation: Mitigating Catastrophic Inheritance of Large Language Models](https://arxiv.org/abs/2408.04556)
    - PEFT는 사전학습 데이터로부터의 bias propagation 이슈가 존재
    - → 세 개의 regularization terms: (1) consistency regularizer (2) diversity regularizer (3) singular vector decomposition regularizer
    - [깃허브 링크](https://github.com/cyp-jlu-ai/BA-LoRA) 🔗
- 📜 [Appier AI Research] [Let Me Speak Freely? A Study on the Impact of Format Restrictions on Performance of Large Language Models](https://arxiv.org/abs/2408.02442)
    - JSON, XML 등의 표준화된 형식으로 데이터를 뽑아내는 structured generation은 real-world application에서 활발하게 사용중
    - 특정 포맷을 강제할수록, 그리고 포맷이 엄격할수록 모델의 추론 능력이 하락하는 경향성을 관측

</details>

<details>
  <summary>3rd week</summary>

- 📜 [Google DeepMind] [Gemma Scope: Open Sparse Autoencoders Everywhere All At Once on Gemma 2](https://arxiv.org/abs/2408.05147)
    - Sparse autoencoders (SAEs)는 neural network의 latent representation을 interpretable feature로 decomposition 하는 방법을 비지도 학습으로 배움
    - Gemma 2 2B의 전체 layer, 9B의 일부 layer에서 학습, 27B에서 선택된 JumpReLU SAEs를 공개 → 비교를 위해 instruction-tuned version을 함께 공개
- 📜 [Liverpool] [Order Matters in Hallucination: Reasoning Order as Benchmark and Reflexive Prompting for Large-Language-Models](https://arxiv.org/abs/2408.05093)
    - LLM이 답변과 reasoning을 생성하는 순서가 consistency에 영향을 준다는 것을 발견 (answer → reasoning vs. reasoning → answer)
    - → LLM consistency를 평가하기 위한 새로운 벤치마크 제안, 직관적인 프롬프트 전략 제안
    - Andrej Karpathy가 언급한 [Jagged Intelligence](https://x.com/karpathy/status/1816531576228053133)와 관련된 문제로 볼 수 있음
- 📜 [Sakana AI] [The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery](https://arxiv.org/abs/2408.06292)
    - automatic scientific discovery를 위한 LLM 기반 프레임워크, The AI Scientist
    - open-ended 방식으로 아이디어 발전 과정을 반복하며 knowledge archive를 키워 나감
    - diffusion modeling, transformer-based language modeling, learning dynamics, 세 분야에서 실험하는 동안 15$ 이하의 비용이 발생
    - [깃허브 링크](https://github.com/SakanaAI/AI-Scientist) 🔗
    - 반드시 확인해봐야 할 내용인 것 같음. 현재 엄청난 주목을 받고 있는 논문.
- 📜 [Microsoft, Harvard] [Mutual Reasoning Makes Smaller LLMs Stronger Problem-Solvers](https://arxiv.org/abs/2408.06195)
    - small language models (SLMs)의 추론 성능을 크게 향상 시켜주는 self-play mutual reasoning 방법론, rStart 제안
    - 1) target SLM이 Monte Carlo Tree Search (CMTS)를 human-like reasoning actions로 증강
    - 2) another SLM이 target SLM이 만들어내는 trajectory를 discriminate
    - → 양측 동의를 받은 것들은 mutual consistent로 구분
- 🧑🏻‍💻 [Anthropic] [Prompt caching with Claude](https://www.anthropic.com/news/prompt-caching)
    - API call 에서 자주 사용되는 컨텍스트를 캐싱하는 기능을 제공
    - 배경 지식, 예시 등을 설명하는데 사용되었던 컨텍스트가 캐싱됨으로써 비용을 90%까지 줄이고 latency도 85%까지 감소할 수 있음.
    - 현재 public beta로 Claude 3.5 Sonnet & Haiku 에서 사용 가능
- 🧑🏻‍💻 [xAI] [Grok-2 Beta Release](https://x.ai/blog/grok-2)
    - Grok-1.5 대비 대화, 코딩, 추론 능력이 크게 향상된 Grok-2를 공개
    - (xAI피셜..) Claude 3.5 Sonnet & GPT-4-Turbo 이상의 성능
    - Grok-2 & Grok-2 mini 를 X로 선공개. 추후 Grok에서 API 지원
- 📜 [ACL 2024 Best Paper Award]
    - [Cohere] [Aya Model: An Instruction Finetuned Open-Access Multilingual Language Model](https://arxiv.org/abs/2402.07827)
        - 101개 언어를 지원하는 multilingual generative language model
        - instruction datasets을 [링크](https://hf.co/CohereForAI/aya-101)에 공개
    - [Cambridge, ETH] [Causal Estimation of Memorisation Profiles](https://arxiv.org/abs/2406.04327)
        - memorisation: 학습했던 instance를 예측할 수 있는 causal effect
        - 이를 difference-in-differences 방식을 이용하여 효율적으로 측정
        - (1) 큰 모델일수록 memorisation이 강하게 발생 (2) 데이터 순서와 학습률의 영향 (3) 모델 사이즈에 따른 일반적 경향 (예측 가능)
- 🧑🏻‍💻 [Google] [Gemini Live](https://x.com/Google/status/1823409511471690064)
    - Gemini와 자연스러운 대화 기능을 지원. 중간에 끼어들거나 주제를 바꾸는 것도 가능.
    - Gemini Advanced 구독자 대상
- 🧑🏻‍💻 [Qwen] [Introducing Qwen2-Math](https://qwenlm.github.io/blog/qwen2-math/)
    - Qwen2 베이스의 수학 특화 모델 Qwen2-Math, Qwen2-Math-Instruct-1.5B/7B/72B 공개
    - closed-source models (gpt-4o) 보다도 뛰어난 수학적, 추론 능력을 지녔다고 주장
    - [깃허브](https://github.com/QwenLM/Qwen2-Math) 링크 🔗 [허깅페이스](https://huggingface.co/Qwen) 링크 🔗
- 📜 [Google DeepMind] [Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters](https://arxiv.org/abs/2408.03314)
    - 기존보다 훨씬 많은 시간을 추론에 할애할 수 있도록 하면 얼마나 잘할까?
    - (1) dense, process-based verifier reward models에 대한 searching
    - (2) 추론 시 프롬프트가 주어지면 response에 대해 adaptive 하게 모델 분포를 업데이트
    - → ‘사전학습 vs 추론’ 시간의 trade-off에 관한 연구: 작은 모델들도 뛰어난 성능 달성
- 🧑🏻‍💻 [DeepLearning.AI] [Improving accuracy of LLM applications](https://www.deeplearning.ai/short-courses/improving-accuracy-of-llm-applications/)
    - prompting, self-reflection, fine-tuning 등을 통해 모델의 신뢰도와 정확성을 향상
    - Llama 3-8b 모델을 학습하여 text-to-SQL 어플리케이션을 개발
- 📜 [Oxford] [Fine-tuning Large Language Models with Human-inspired Learning Strategies in Medical Question Answering](https://arxiv.org/abs/2408.07888)
    - medical QA 분야에서 커리큘럼 기반의 학습 방식과 그렇지 않은 학습 방식의 결과를 여러 모델에 대해 실험하여 그 효과를 확인
    - curriculum learning의 난이도를 사람이 정하는 것보다 모델이 정하는 것이 더 효율적이었다는 결과
- 🧑🏻‍💻 [MetaGPT: The Multi-Agent Framework](https://github.com/geekan/MetaGPT)
    - one line requirement를 입력으로 받아 user stories, competitive analysis, requirements 등을 output으로 반환
    - 아주 간단하게 소프트웨어 제작 가능
- 🧑🏻‍💻 [NVIDIA] [How to Prune and Distill Llama-3.1 8B to an NVIDIA Llama-3.1-Minitron 4B Model](https://developer.nvidia.com/blog/how-to-prune-and-distill-llama-3-1-8b-to-an-nvidia-llama-3-1-minitron-4b-model/)
    - pruning과 knowledge distillation을 통해 Llama-3.1 8B 모델을 4B으로 줄임
    - from scratch 학습에 비해 16% 높은 MMLU 스코어 달성. 모델 학습에 들어가는 토큰의 수도 40배 가까이 줄일 수 있었음
    - [허깅페이스 링크](https://huggingface.co/nvidia/Llama-3.1-Minitron-4B-Width-Base) 🔗  
</details>

<details>
  <summary>4th week</summary>

- 🧑🏻‍💻 [TII] [Welcome FalconMamba: The first strong attention-free 7B model](https://huggingface.co/blog/falconmamba)
    - 7B 사이즈의 Llama 3, Gemma 등과 비슷한 수준의 퍼포먼스
    - 최적화 벤치마크에서는 더욱 뛰어난 성능
    - base/instruct 버전의 모델을 각각 공개 + 4-bit 버전도 공개 ([허깅페이스 링크](https://huggingface.co/tiiuae) 🔗)
- 📜 [Google DeepMind] [Towards flexible perception with visual memory](https://arxiv.org/abs/2408.08172)
    - neural network는 학습하며 정보를 가중치에 distribute 하기 때문에 이를 조작하기가 쉽지 않음
    - → (1) 데이터의 사이즈에 관계 없이 이를 자유롭게 추가할 수 있는 능력 (2) unlearning & pruning을 통해 데이터를 삭제할 수 있는 능력 (3) 해석 가능한 의사 결정 메커니즘
- 📜 [I-SHEEP: Self-Alignment of LLM from Scratch through an Iterative Self-Enhancement Paradigm](https://arxiv.org/abs/2408.08072)
    - 기존의 LLM은 수동적인 학습자였거나 자신의 합성데이터를 1회성으로 alignment 학습함
    - → from scratch에서 계속해서 self-align 하는 학습 방식을 제안
    - Qwen & Llama 모델의 성능을 크게 개선할 수 있었다고 주장
- 📜 [DeepSeek] [DeepSeek-Prover-V1.5: Harnessing Proof Assistant Feedback for Reinforcement Learning and Monte-Carlo Tree Search](https://arxiv.org/abs/2408.08152)
    - single-pass whole-proof가 아닌, 다양한 proof path를 생성하는 전략인 RMaxTS를 제안. 이는 Monte-Carlo tree search의 variant 중 하나
    - DeepSeek-Prover-V1 모델의 학습 & 추론 과정을 최적화한 DeepSeek-Prover-V1.5 모델 공개
    - [깃허브 링크](https://github.com/deepseek-ai/DeepSeek-Prover-V1.5) 🔗
- 📜 [Salesforce AI, Univ of Washington] [xGen-MM (BLIP-3): A Family of Open Large Multimodal Models](https://arxiv.org/abs/2408.08872)
    - LLMM 개발을 위한 프레임워크 xGen-MM (BLIP-3)
    - 엄선된 학습 데이터셋, 학습 레시피, 모델 아키텍쳐, 학습 결과 등을 오픈소스로 공개
    - DPO를 이용하여 safety tuning을 적용
- 📜 [Meta] [Imagine yourself: Tuning-Free Personalized Image Generation](https://ai.meta.com/research/publications/imagine-yourself-tuning-free-personalized-image-generation/)
    - 기존에는 복잡한 프롬프트가 주어지거나 이미지 퀄리티를 살리려는 시도에서 reference 이미지를 그대로 복붙하는 경향이 있음
    - → 1) 이미지 다양성을 높이기 위한 synthetic paired data 생성 메커니즘, 2) 완전히 병렬적인 세 개의 text encoder와 학습 가능한 visual encoder, 3) visual quality를 점진적으로 향상시키는 coarse-to-fine multi-stage finetuning
- 📜 [Vanderbit University] [Reasoning Beyond Bias: A Study on Counterfactual Prompting and Chain of Thought Reasoning](https://arxiv.org/abs/2408.08651)
    - 언어 모델은 실제 추론 대신 학습 데이터로터의 regularity를 반복할 뿐 (MMLU 등 벤치에서도)
    - → 이를 해결하기 위해 Counterfactual CoT & Agnostically Primed CoT 를 제안
    - bias를 줄이는 데 전자로만은 불충분할 수 있긴 하나, 특정 상황에서는 충분
- 🧑🏻‍💻 [Lambda] [Unveiling Hermes 3: The First Full-Parameter Fine-Tuned Llama 3.1 405B Model is on Lambda’s Cloud](https://lambdalabs.com/blog/unveiling-hermes-3-the-first-fine-tuned-llama-3.1-405b-model-is-on-lambdas-cloud)
    - Llama 3.1 405B 모델을 fully fine-tuning 하여 성능을 향상시킨 모델
    - [Lambda Chat Completions API](http://api.lambdalabs.com/docs)와 [Lambda Chat](https://lambda.chat/)에서 사용 가능
- 📜 [Google Research] [Transformers in music recommendation](https://research.google/blog/transformers-in-music-recommendation/)
    - 구글에서 유튜브 뮤직의 음악 추천에 트랜스포머 모델을 활용 (기존 ranking 모델과 결합)
    - Intention of action, Salience metrics, Metadata, Music track identifiers
- 🧑🏻‍💻 [Luma AI] [Dream Machine 1.5](https://lumalabs.ai/dream-machine)
    - 더 높은 수준의 text-to-video 모델을 공개
    - prompts에 대한 이해, 커스텀 text rendering, image-to-video 성능 등을 개선
- 🧑🏻‍💻 [Microsoft] [Microsoft releases Phi-3.5-mixture-of-experts (MoE)](https://huggingface.co/collections/microsoft/phi-3-6626e15e9585a200d2d761e3)
    - MoE를 이용하여 Llama3 8B & Gemma2 9B 를 능가, GPT-4o-mini에 준하는 성능
    - 4.9T 토큰 학습, 그중 10%는 multilingual content, 128k 토큰 길이 지원
    - SFT, PPO, DPO 등 학습 과정을 거침
- 🧑🏻‍💻[OpenAI] [Fine-tuning now available for GPT-4o](https://openai.com/index/gpt-4o-fine-tuning/)
    - 조직당 하루 1M 토큰을 무료로 fine-tuning 가능
    - [fine-tuning dashboard](https://platform.openai.com/finetune) 에서 사용할 수 있음
- 📜 [Waterloo, Fudan] [TableBench: A Comprehensive and Complex Benchmark for Table Question Answering](https://arxiv.org/abs/2408.09174)
    - LLM은 여전히 현실 세계의 tabular data를 잘 처리하지 못한다는 문제점을 안고 있음
    - industrial scenarios를 반영한 벤치마크, TableBench를 제안
    - GPT-3.5 수준의 성능을 내는 TabelLLM을 소개 (TableInstruct 데이터셋으로 학습)
- 🧑🏻‍💻 [Ideogram] [Introducing Ideogram 2.0](https://x.com/ideogram_ai/status/1826277550798278804)
    - 아이폰 앱으로 무료 이용 가능
    - Flux, Midjourney에 도전..! Color Palette Selection, Enhanced Text Rendering, Search Functionality, Improved Image Coherence 가 특징
- 📜 [NVIDIA] [LLM Pruning and Distillation in Practice: The Minitron Approach](https://arxiv.org/abs/2408.11796)
    - Llama 3.1 8B & Mistral NeMo 12B를 각각 4B & 8B 로 압축한 모델에 대한 report
    - depth pruning & joint hidden/attention/MLP (width) pruning 에 대해 탐구
    - 기존 데이터를 모르는 상황에서 teacher 모델을 distillation dataset에 학습하는 방식이 유익할 수 있다고 주장
    - 허깅 페이스에 공개: [Mistral-NeMo-Minitron-8B-Base](https://huggingface.co/nvidia/Mistral-NeMo-Minitron-8B-Base) | [Llama-3.1-Minitron-4B-Width-Base](https://huggingface.co/nvidia/Llama-3.1-Minitron-4B-Width-Base) | [Llama-3.1-Minitron-4B-Depth-Base](https://huggingface.co/nvidia/Llama-3.1-Minitron-4B-Depth-Base)
- 🧑🏻‍💻 [Adobe Research] [MagicFixup](https://github.com/adobe-research/MagicFixup?tab=readme-ov-file#gradio-demo)
    - 이미지 내의 영역을 자유롭게 선택해서 원하는대로 수정할 수 있도록 돕는 기능
    - 기존에는 이런 모델을 학습하기 위해 이미지를 사용하는데, 여기서는 비디오를 사용
- 🧑🏻‍💻 [Meta] [Sapiens: Foundation for Human Vision Models](https://about.meta.com/realitylabs/codecavatars/sapiens?_bhlid=9ff3b20994dca7d88de03063c5de34f1da2853ed)
    - 2D pose estimation, body-part segmentation, depth estimation, surface normal prediction
    - 위 네 개의 핵심 vision tasks를 지원하는 모델 패밀리 Sapiens를 공개
    - [아카이브 링크](https://about.meta.com/realitylabs/codecavatars/sapiens?_bhlid=9ff3b20994dca7d88de03063c5de34f1da2853ed) 🔗 [깃허브 링크](https://github.com/facebookresearch/sapiens) 🔗
- 📜 [Singapore] [LLMs are not Zero-Shot Reasoners for Biomedical Information Extraction](https://arxiv.org/abs/2408.12249)
    - LLM이 healthcare 분야에서 QA나 요약 태스크를 잘함 → 정보 추출도 잘할까?
    - Medical Classification & NER 벤치마크 점수 비교: BioMistral & Llama-2
    - standard prompting, CoT, Self-Consistency, RAG 등을 비교 → standard best
    - knowledge, reasoning 향상을 위한 여러 prompt 테크닉이 biomedical tasks에 쉽게 적용 불가능하다는 것을 시사하는 실험 결과
- 🧑🏻‍💻 [AI21 labs] [The Jamba 1.5 Open Model Family: The Most Powerful and Efficient Long Context Models](https://www.ai21.com/blog/announcing-jamba-model-family)
    - Transformer와 SSM을 합친 Mini (active 12B/52B) & Large (94B/398B) MoE
    - 비슷한 사이즈의 모델 중에서 Mixtral 8x22B, Command-R+ 보다 뛰어난 성능 (Mini)
    - 256K context window 사이즈를 가지며 추론 속도도 빠른 것이 특징
    - [허깅페이스 링크](https://huggingface.co/collections/ai21labs/jamba-15-66c44befa474a917fcf55251) 🔗
- 📜 [Google] [Speculative RAG: Enhancing Retrieval Augmented Generation through Drafting](https://arxiv.org/abs/2407.08223)
    - 여러 개의 small, distilled specialist LM들이 생성하는 RAG draft를 효율적으로 검증하는 larger generalist LM을 이용하는 RAG 프레임워크를 제안
    - 각 draft는 retrieved documents의 subset으로 생성 → draft당 input token count는 줄이면서 다양한 관점을 제공할 수 있다는 장점
    - 각 subset에 대한 이해도를 높이고 긴 context에 대한 position bias를 줄일 수 있음
    - [Google Research 블로그 포스팅 링크](https://research.google/blog/speculative-rag-enhancing-retrieval-augmented-generation-through-drafting/) 🔗
- 🧑🏻‍💻 [Anthropic] [Anthropic added support Latex rendering in Claude Web interface](https://x.com/AnthropicAI/status/1826667671364272301)
    - 이제 수학 공식을 온전한 LaTeX 형식으로 읽을 수 있는 기능을 지원
    - [링크](https://t.co/bJ8BjBTEpe) 🔗 에서 설정 가능
    - 그동안엔 수식이 일반 텍스트처럼 나와서 읽기가 힘들었는데 꼭 필요한 기능이 너무 늦게 지원된 것 같다는 생각이 듦..
</details>

<details>
  <summary>5th week</summary>

- 📜 [The Fin AI] [Open-FinLLMs: Open Multimodal Large Language Models for Financial
Applications](https://arxiv.org/abs/2408.11878)
    - Financial LLMs, Open-FinLLMs를 공개
    - 52B 토큰으로 학습된 FinLLaMA 모델에 573K financial instruction으로 fine-tuning 한 FinLLaMA-instruct
    - financial data 타입을 다루는 1.43M 개의 image-text instruction으로 학습된 FinLLaVA를 공개
- 📜 [Singapore] [Language Modeling on Tabular Data: A Survey of Foundations, Techniques and Evolution](https://arxiv.org/abs/2408.10548)
    - (1) 여러 종류의 tabular data structure와 자료형을 categorization
    - (2) 모델 학습과 평가를 위한 핵심 데이터셋에 대한 리뷰
    - (3) data processing methods, popular architectures 등 모델링 테크닉 요약
    - 외에도 잠재적인 어려움이나 미래 발전 방향에 대해 논한 survery 페이퍼
- 📜 [British Columbia] [Automated Design of Agentic Systems](https://arxiv.org/abs/2408.08435) (ADAS)
    - 새로운 블록을 만들거나 이를 새로운 방식으로 결합하는 등 강의 개발을 모델이 자동적으로 수행할 수 있도록 하는 agentic system design을 만드는 것을 목표로 삼고 있음
    - Meta Agent Search: 이전의 발견들을 쌓아두어 점점 커지는 archive를 바탕으로 계속해서 새로운 agent를 프로그래밍 해나갈 수 있다는 아이디어
    - [깃허브 링크](https://github.com/ShengranHu/ADAS) 🔗
- 📜 [Kyoto University] [Beyond English-Centric LLMs: What Language Do Multilingual Language Models Think in?](https://arxiv.org/abs/2408.10811)
    - English-centric 모델 Llama2를 대상으로 latent language에 대한 실험을 수행
    - 일본어로 continued pretraining 한 Swallow, 영어와 일본어를 균형 있게 학습한 LLM-jp
    - → 영어만이 latent language인 Llama2와 달리, Swallow와 LLM-jp는 영어와 일본어 둘 다 laten language라고 볼 수 있음
- 📜 [HuggingFace] [Building and better understanding vision-language
models: insights and future directions](https://arxiv.org/abs/2408.12637)
    - vision-language models (VLMs)를 만드는 각 방법론들의 장/단점, 그리고 주요 챌린지 등을 보고
    - 더 직관적인 파이프라인으로 학습하여 전작 Idenfic2-8B를 능가하는 Idefics3-8B를 학습 데이터와 함께 공개
- 🧑🏻‍💻 [Priceton-NLP] [Llama-3-8B-ProLong](https://huggingface.co/collections/princeton-nlp/prolong-66c72d55d2051a86ac7bd7e4)
    - 기존 Llama-3의 성능을 저해하지 않으면서도 긴 컨텍스트를 이해할 수 있도록 학습한 모델
    - Instruct 버전도 존재하며 현재는 64K 버전만 공개되어 있음. 향후 512K 버전도 공개 예정
    - 1저자가 SimCSE 저자임
- 📜 [Institute of Automation] [K-Sort Arena: Efficient and Reliable Benchmarking for Generative Models via K-wise Human Preferences](https://arxiv.org/abs/2408.14468)
    - 기존의 아레나 방식은 사람들의 선호 파악을 위해 지나치게 많은 투표 결과를 받아야 한다는 문제점 존재
    - → 이미지와 비디오는 텍스트에 비해 더 인지적 직관성이 높다는 특징을 이용 (이미지 아레나임)
    - K개의 모델이 한 번에 경쟁에 참여 ⇒ ELO 알고리즘 대비 16.3배 빠른 수렴 속도
    - [허깅페이스 스페이스 링크](https://huggingface.co/spaces/ksort/K-Sort-Arena) 🔗
- 📜 [University of Edinburgh]  [Explicit Inductive Inference using Large Language Models](https://arxiv.org/abs/2408.14467)
    - 언어 모델에게, Premise가 Hypothesis를 entail 하는지를 묻는 것과, 반대로 Hypothesis의 conditional truthfulness를 Premise로 검증하는 것은 다른 문제 ⇒ bias 존재 ⇒ inductive inference에 활용
    - LLM을 이용하여 premise를 attested alternative 세트로 변경 & 이를 기반으로 hypothesis derive ⇒ 둘을 이용하여 NLI task 성능 향상
- 🧑🏻‍💻 [Anthropic] [Anthropic publishes Claude’s system prompts](https://x.com/alexalbert__/status/1828107230656471442)
    - Anthropic의 공식 문서에 새로운 시스템 프롬프트를 추가
    - 이는 [Claude.ai](http://Claude.ai) 와 모바일 앱에 영향을 주지만 API와는 무관함
- 🧑🏻‍💻 [Nous Research] [DisTro](https://github.com/NousResearch/DisTrO)
    - GPT 간 분산처리를 최적화하여 기존 대비 1,000x - 10,000x 속도 향상을 이뤄냈다고 보고
    - 깃허브에 A Preliminary Report on DisTrO를 공개
- 🧑🏻‍💻 [DeepLearning.AI] [Large Multimodal Model Prompting with Gemini](https://www.deeplearning.ai/short-courses/large-multimodal-model-prompting-with-gemini/)
    - 구글의 Gemini를 이용하여 멀티모달 모델 사용 방법을 학습
    - function calling과 API 통합 관련 내용까지 포함
- 🧑🏻‍💻 [Google] [Google just released three new experimental Gemini 1.5 models](https://x.com/OfficialLoganK/status/1828480081574142227)
    - Gemini 1.5 Flash-8B, Gemini 1.5 Pro (better coding & complex prompts), improved Gemini 1.5 Flash model
    - [Google AI Studio](https://ai.google.dev/aistudio/)에서 사용 가능
- 📜 [Waseem Inc.] [Writing in the Margins: Better Inference Pattern for
Long Context Retrieval](https://arxiv.org/abs/2408.14906)
    - retrieval-oriented task에서 long input sequence 처리를 최적화한 inference pattern, Writing in the Margins (WiM) 공개
    - key-value cache의 chuncked prefill을 이용하여 segment-wise inference 실시 → 모델을 특정 task로 가이드하는 중간 정보, “margin”을 생성하고 분류하는 데 도움이 됨
    - [깃허브 링크](https://github.com/writer/writing-in-the-margins) 🔗에 사용 예시를 함께 공개
    - 허깅페이스 Daily Papers에서 100개 이상의 upvote를 받을 정도로 인기가 많은 연구 결과
- 📜 [Google Research] [Diffusion Models Are Real-Time Game Engines](https://arxiv.org/abs/2408.14837)
    - 복잡한 환경과 이동 경로에 대해 실시간 상호작용이 가능한 최초의 neural model 기반의 게임 ㅔㅇ진, GameNGen을 공개
    - single TPU에서 초당 20 프레임으로 DOOM에서 simualte 가능
    - (1) RL-agent가 게임 플레이를 학습 (2) diffusion 모델이 이전 프레임과 행동들을 기반으로 다음 프레임을 생성하도록 학습
    - [깃허브 링크](https://gamengen.github.io) 🔗
- 🧑🏻‍💻 [Qwen] [Qwen2-VL: To See the World More Clearly](https://qwenlm.github.io/blog/qwen2-vl/)
    - 향상된 video understanding 능력을 갖춘 Apache 2.0 라이센스의 오픈소스 모델
    - 2B, 7B, 72B 중에서 72B는 API로만 이용 가능
    - 72B 모델은 GPT-4o나 Claude 3.5-Sonnet을 넘어설 정도의 visual understanding benchmark score를 보여주었음
- 📜 [Google DeepMind] [Generative Verifiers: Reward Modeling as Next-Token Prediction](https://arxiv.org/abs/2408.15240)
    - LLM이 생성한 N개의 후보 solution들의 순위를 매겨주는 verifier를 사용하는 방식인 Best-of-N 방식은 LLM의 텍스트 생성 능력을 활용하고 있지는 않음
    - → next-token prediction objective로 verifier를 학습, 즉 verification과 solution generation을 joint training
    - 기존 instruction tuning, CoT reasoning 등과 seamlessly 통합 가능
- 📜 [Tsinghua] [LongWriter: Unleashing 10,000+ Word Generation from Long Context LLMs](https://arxiv.org/abs/2408.07055)
    - LLM이 긴 text를 생성하지 못하는 이유는 SFT 단계에서의 학습 데이터 때문
    - → 엄청나게 긴 생성 태스크를 여러 개의 subtask로 쪼개어 LLM이 20,000 단어 이상의 텍스트를 생성할 수 있도록 만드는 agent-based pipeline 제시
    - LongWriter-6K: 답변의 길이가 2K - 32K 에 이르는 텍스트로 구성된 데이터셋
    - 장문의 텍스트 생성 능력이 있는지를 검증하는 벤치마크 LongBench-Write 또한 공개
    - [깃허브 링크](https://github.com/THUDM/LongWriter) 🔗
- 📜 [Alibaba, Meta] [WavTokenizer: an Efficient Acoustic Discrete Codec Tokenizer for Audio Language Modeling](https://arxiv.org/abs/2408.16532)
    - audio 도메인에서 SOTA를 달성한 acoustic codec model, WavTokenizer
    - extreme compression, improved subjective quality를 특징으로 내세움
    - [깃허브 링크](https://github.com/jishengpeng/WavTokenizer) 🔗
</details>


## 🙇🏻 September
<details>
  <summary>1st week</summary>

- 📜 [Meta] [Transfusion: Predict the Next Token and Diffuse Images with One Multi-Modal Model](https://www.arxiv.org/abs/2408.11039)
    - discrete & continuous 데이터에 대한 multi-modal model 학습 레시피를 공개
    - 언어 모델의 loss function(next token prediction)을 diffusion과 결합하여 mixed-modality sequence에 대해 single transformer를 학습
    - 7B 사이즈의 모델을 scratch부터 학습하고 2T multi-modal token을 사용, scaling law 확인.
    - 텍스트로 이뤄진 시퀀스 중간에 이미지 패치의 vector가 <BOI> & <EOI> 태그 사이에 삽입
- 📜 [Stanford] [Anchored Preference Optimization and Contrastive Revisions:
Addressing Underspecification in Alignment](https://arxiv.org/abs/2408.06266v3)
    - LLM이 선호 데이터셋에 align 되는 과정은 꽤나 복잡하고 기대 이하의 결과로 이어지는 경우가 많음
    - → (1) 선호 데이터는 response가 contrastive 할 때 더 나은 learning singnal을 제공
    - → (2) alignment objective는 모델 학습에서 control over를 구체화 할 때 더욱 효과적 (?)
    - Contrastive Learning from AI Revisions (CLAIR): more contrastive preference pairs & Anchored Preference Optimization (APO)
- 📜 [Google DeepMind, UCLA, Milla] [Smaller, Weaker, Yet Better: Training LLM Reasoners via Compute-Optimal Sampling](https://arxiv.org/abs/2408.16737)
    - 합성데이터 생성에서 stronger but expensive (SE) vs. weaker but cheaper (WC) 비교
    - 세 개의 주요 메트릭: coverage, diversity, false positive rate → WC가 더 높은 coverage, diversity, but 더 높은 false positive 비율
    - weak-to-strong improvement setup: weaker LM이 stronger LM에게 reasoning을 가르침
    - WC-generated data로 학습한 모델이 SE-generated data로 학습한 모델보다 뛰어난 성능
- 📜 [University of Virginia] [Dynamic Self-Consistency: Leveraging Reasoning Paths for Efficient LLM Sampling](https://arxiv.org/abs/2408.17017)
    - SC 관련해서 비용을 최소화하고자 하는 연구는 있었으나 reasoning path의 quality에 집중하는 것은 부족했다고 지적
    - → output answer와 CoT로부터의 reasoning path를 동시에 고려하여 생성되는 sample의 숫자를 dynamic하게 조절하는 early framework, Reasoning-Aware Self-Consistency (RASC)
    - 생성되는 샘플들에 confidence score를 부여하고 일정 기준이 충족되면 stop → weighted majority voting
- 🧑🏻‍💻 [LMSYS] [Lmsys launches style control for Chatbot Arena to help separating the impact of style from substance in LLM rankings](https://y1mnw3w8.r.us-east-1.awstrack.me/L0/https:%2F%2Flink.alphasignal.ai%2FNrhrYd/2/01000191b450e825-9493be3f-106c-4bf6-a9c4-4ae7a4e7370e-000000/8U59LlKUzwU7SzqhapRkBOVCPYU=389)
    - style control: 길이가 긴 or 포맷이 잘 갖춰진 답변을 생성하는 모델은 어떤 것인가?
- 📜 [DP Technology] [SciLitLLM: How to Adapt LLMs for Scientific Literature Understanding](https://arxiv.org/abs/2408.15545)
    - LLM 과학 분야에서의 문제점 (1) 과학적 지식 부족 (2) 과학 특화 태스크에 친숙하지 x
    - continual pre-training (CPT) & supervised fine-tuning (SFT) 통합한 hybrid strategy 제안 → 과학 도메인 지식을 불어넣고 domain specific 태스크에서 instruction following 능력을 향상
    - 이를 위해 (1) 고품질의 CPT corpora 필요 (2) 다양한 SFT instructions 생성 필요
    - → PDF text extraction, parsing content error correction, quality filtering, synthetic instruction creation을 아우르는 pipeline으로 해결 시도
- 📜 [Independent Researcher] [CURLoRA: Stable LLM Continual Fine-Tuning and Catastrophic Forgetting Mitigation](https://arxiv.org/abs/2408.14572)
    - LoRA에 CUR matrix decomposition을 접목한 CURLoRA 제시
    - → catastrophic forgetting during continual learning 완화 & trainable parameters 감소
    - 변형된 CUR decomposition: 1) 열과 행 선택에 역확률 (inverted probability) 2) U 행렬 0으로 초기화 3) U 행렬만 fine-tuning
- 📜 [Tsinghua University] [Mini-Omni: Language Models Can Hear, Talk While Thinking in Streaming](https://arxiv.org/abs/2408.16725)
    - real-time conversation이 가능하려면 audio modality로 입력을 받는 중에 생성을 할 수 있어야 함
    - audio-based end-to-end conversational model, Mini-Omni (real-time speech를 위한 최초의 오픈소스 모델)
    - text-instructed speech generation, batch-parallel strategies 사용
    - speech output을 만들 수 있도록 학습하는 데 사용 가능한 데이터셋 VoiceAssistant-400K
    - [깃허브 링크](https://github.com/gpt-omni/mini-omni) 🔗
- 📜 [Peking University, ByteDance] [MultiMath: Bridging Visual and Mathematical Reasoning for Large Language Models](https://arxiv.org/abs/2409.00147)
    - 현재 오픈소스 LLM들이 수학적 추론을 할 때 시각적인 정보(geometric diagrmas, charts, function plots)를 활용하지 않고 있음을 지적
    - → 네 단계로 학습: 1) vison-language alignment 2) visual instruction-tuning 3) math instruction-tuning 4) process-supervised reinforcement learning → MultiMath-7B
    - K-12 수준의 image caption과 step-wise solution을 포함하는 MultiMath-300K 데이터셋 공개
    - [깃허브 링크](https://github.com/pengshuai-rin/MultiMath) 🔗
- 📜 [NVIDIA] [In Defense of RAG in the Era of Long-Context Language Models](https://arxiv.org/abs/2409.01666)
    - LLM이 더 긴 입력을 처리할 수 있게 되면서 RAG의 매력도 감소
    - 그러나 극단적으로 길이가 긴 입력을 처리하는 것은 결국 관련성 높은 정보에 집중하는 것을 방해함으로써 성능 저하로 이어짐
    - → order-preserve retrieval-augmented generation (OP-RAG) 제안
    - retrieved chunk가 증가할수록 답변 퀄리티는 초반에 상성하다가 결국 감소하여 U-shaped curve ⇒ OP-RAG가 이득을 볼 수 있는 지점이 분명히 존재한다
- 📜 [AI2, Washington, Princeton] [OLMoE: Open Mixture-of-Experts Language Models](https://arxiv.org/abs/2409.02060)
    - 7B의 파라미터를 갖고 있지만 input 토큰 당 1B 파라미터만 사용하는 OLMoE-1B-7B 공개
    - 5T 토큰으로 사전학습한 모델이며 instruct 버전도 함께 공개
    - Llama2-13B-Chat, DeepSeekMoE-16B 보다도 뛰어난 성능이라고 주장
    - 모델 가중치, 학습 데이터, 코드, 로그 등을 오픈소스로 공개. 역시 AI2..
    - [허깅페이스](https://hf.co/allenai/OLMoE-1B-7B-0924), [깃허브](https://github.com/allenai/OLMoE) 링크 🔗
- 📜 [Tsinghua] [LongCite: Enabling LLMs to Generate Fine-grained Citations in Long-context QA](https://arxiv.org/abs/2409.02897)
    - long-context LLM이 sentence-level의 fine-grained citation을 포함한 답변을 생성할 수 있도록 하는 연구, Long-Context Question Answering (LCQA)
    - LCQA를 평가하기 위한 벤치마크 LongBench-Cite 제안
    - CoF (Coarse to Fine) 파이프라인 제안
    - LongCite-45k 데이터셋을 사용하여 LongCite-8B, 9B를 학습
    - [깃허브 링크](https://github.com/THUDM/LongCite) 🔗
- 📜 [Autodesk AI Research] [MMLU-Pro+: Evaluating Higher-Order Reasoning and Shortcut Learning in LLMs](https://arxiv.org/abs/2409.02257)
    - MMLU-Pro를 바탕으로 LLM의 shortcut learning과 higher-order reasoning을 평가하기 위한 벤치마크 MMLU-Pro+를 제안
    - 복잡한 추론을 하도록 세팅이 되어 있어서 단순한 problem-solving 전략과 다르다고 주장
    - 모델이 실제 추론을 하지 않고 표면적인 패턴을 학습하여 정답을 맞히는 shortcut learning 현상을 최소화하는 것이 본 연구의 목표. shortcut learning의 정도를 평가할 수 있는 메트릭도 제시.
    - [깃허브 링크](https://github.com/asgsaeid/mmlu-pro-plus) 🔗
- 🧑🏻‍💻 [SSI] [lya Sutskever’s startup, Safe Superintelligence, *raises $1 BILLION*](https://x.com/ssi/status/1831325643226890379)
    - OpenAI의 전 공동 창업자 Ilya Sutskever가 창업한 스타트업 Superintelligence가 1조원 규모의 투자를 받음
- 📜 [Tsinghua University] [Attention Heads of Large Language Models: A Survey](https://arxiv.org/abs/2409.03752)
    - LLM의 internal reasoning process를 개선할 수 있도록 attention head의 interpretability와 underlying mechanism에 집중
    - 사람의 생각을 네 단계의 프레임워크로 distill: 1) Knowledge Recalling, 2) In-Context Identification, 3) Latent Reasoning, 4) Expression Preparation
    - [깃허브 링크](https://github.com/IAAR-Shanghai/Awesome-Attention-Heads) 🔗
- 📜 [HSE University] [Guide-and-Rescale: Self-Guidance Mechanism for Effective Tuning-Free Real Image Editing](https://arxiv.org/abs/2409.01322)
    - 입력 이미지의 전체적인 구조와 변경되지 않아야 하는 local region을 잘 보존할 수 있도록 하는 sef-guidance technique를 탐구
    - source 이미지의 local & global 구조를 저장할 수 있도록 하는 layout-preserving energy function을 도입
    - → fast & high-quality editing mechanism
    - [깃허브 링크](https://github.com/FusionBrainLab/Guide-and-Rescale) 🔗
- 📜 [Tsinghua University] [Pandora's Box or Aladdin's Lamp: A Comprehensive Analysis Revealing the Role of RAG Noise in Large Language Models](https://arxiv.org/abs/2408.13533)
    - Noise RAG Benchmark 구축
    - 언어학적인 관점에서 7개의 노이즈를 정의
    - → beneficial noise vs harmful noise로 구분
</details>

<details>
  <summary>2nd week</summary>

- 🧑🏻‍💻 [HuggingFace, IBM] [Improving Hugging Face Training Efficiency Through Packing with Flash Attention](https://huggingface.co/blog/packing-with-FA2)
    - Flash Attention 2를 사용하여 instruction tuning을 진행할 때, padding 없이 packing 해주는 방법에 대한 허깅페이스 블로그 글
    - 최대 2배까지 높은 throughput으로 이어진다고 함
- 📜 [Google DeepMind] [Building Math Agents with Multi-Turn Iterative Preference Learning](https://arxiv.org/abs/2409.02392)
    - 현재 direct preference learning 알고리즘은 single-turn chat task에 집중하고 있음. 즉, multi-turn 또는 external tool integration에 관심이 없음
    - → multi-turn direct preference learning framework를 제안: multi-turn DPO & KPO
- 📜 [University of Toronto, Vector Institute] [Report Cards: Qualitative Evaluation of Language Models Using Natural Language Summaries](https://arxiv.org/abs/2409.00844)
    - LLM은 conventional quantitative 벤치마크로 그 능력을 평가하기 어려움
    - → 특정 스킬이나 토픽에 대한 모델의 behavior를 요약한 natrual language summaries, Report Cards를 제안
    - specificity, faithfulness, interpretability, 세 기준을 근거로 Report Cards를 평가
    - human supervision 없이 Report Cards를 생성하는 iterative algorithm 제안
- 🧑🏻‍💻 [Replit] [Replit Agent](https://docs.replit.com/replitai/agent)
    - 자연어 프롬프트로부터 어플리케이션을 만들어 낼 수 있는 AI agent 기능을 공개
    - cursor의 composer와 유사한 기능으로 보임
    - long context, code understanding & generation에 많은 기업들이 집중하는 이유
- 🧑🏻‍💻 [Google] [Illuminate](https://illuminate.google.com/home)
    - research paper를 short podcast로 변환해주는 툴을 공개
    - 현재 waitlist에 등록해야 하는 실험적 기능임
- 📜 [Beijing University] [How Do Your Code LLMs Perform? Empowering Code Instruction Tuning with High-Quality Data](https://arxiv.org/abs/2409.03810)
    - 어떤 데이터를 진정한 high-quality code instruction data로 볼 수 있을까?
    - instruction complexity, response quality, instruction diversity 세 개의 기준으로 데이터를 선별
    - 선별된 데이터로 Llama-3를 학습하여 XCoder 모델을 공개
- 📜 [Mila, Princeton, Cambridge, Google DeepMind] [Metacognitive Capabilities of LLMs: An Exploration in Mathematical Problem Solving](https://arxiv.org/abs/2405.12205) (5월 논문)
    - Meta cognitive knowledge: 자신의 thinking & reasoning process에 대한 직관적인 지식
    - → 본 연구 결과에 따르면 LLM이 meta cognitive knowledge를 지닌 것으로 판단된다고 함
    - 수학 문제에 합리적인 skill label을 붙일 수 있다는 것이 확인되었음. 그 결과는 사람도 해석 가능.
- 📜 [Oxford] [Detecting hallucinations in large language models using semantic entropy](https://www.nature.com/articles/s41586-024-07421-0) (Nature)
    - 인간이 정답을 알지 못하는 unseen questions에 대해도 LLM이 working 해야 함
    - → entropy-based uncertainty estimator를 도입하여 LLM이 hallucinations-confabulations-를 탐지할 수 있도록 함
    - 데이터셋이나 task에 대한 사전 지식 없이도 적용 가능한 방법론임을 설명
- 📜 [Singapore University] [Spinning the Golden Thread: Benchmarking Long-Form Generation in Language Models](https://arxiv.org/abs/2409.02076)
    - long-context language models(LM)을 Needle-in-a-Haystack (NIAH) 로 평가하는 것은 부적절
    - → 생성된 long text sequences 내의 특정 사건들을 식별할 수 있는 능력을 평가하는 Spinning the Golden Thread (SGT) 제안
    - LM이 특정 사건과 constraint를 포함하여 long-form text를 생성하도록 지시
- 🧑🏻‍💻 [Huawei]  [Huawei unveils $2,800 tri-fold phone just hours after iPhone 16 launch.](https://x.com/alvinfoo/status/1833427069470183795)
    - 화웨이에서 3단으로 접히는 스마트폰을 세계 최초로 출시. 약 377만원부터 시작
- 📜 [University of Toronto] [Seek and Solve Reasoning for Table Question Answering](https://arxiv.org/abs/2409.05286)
    - Seek-and-Solve 파이프라인: LLM으로 하여금 관련 있는 정보를 먼저 찾고 답변을 생성하도록 지시
    - reasoning은 two-stage로 구성, CoT paths는 Seek-and-Solve CoT로 통합 (SS-CoT)
- 📜 [Stanford University] [Can LLMs Generate Novel Research Ideas? A Large-Scale Human Study with 100+ NLP Researchers](https://www.arxiv.org/abs/2409.04109)
    - 100명의 expert NLP researcher와 LLM ideation agent 를 비교 → blind review
    - LLM-generated idea가 사람이 만든 것보다 더 novel 하다는 결과 (p<0.05). 단, feasibility는 조금 더 낮은 것으로 확인됨.
    - 얼마 전 Sakana에서 공개한 AI Scientist도 그렇고.. 확실히 연구도 AI로 하는 시대가 오게 될 듯
- 📜 [Apple] [Theory, Analysis, and Best Practices for Sigmoid Self-Attention](https://arxiv.org/abs/2409.04431)
    - 기존 softmax attention과 비교하여, sigmoid attention이 universal function approximator일 뿐만 아니라 regularity를 개선해줄 수 있다는 측면에서 좋다고 주장
    - H100에서 FlashAttention2 위에서 돌아가는 Flash-Sigmoid 도입 → 추론 속도 17% 향상
    - 이런 것들은 실제 사용 경험을 많이 접해보고 적용하면 좋을 것 같음
- 📜 [UIUC, CMU] [Paper Copilot: A Self-Evolving and Efficient LLM System for Personalized Academic Assistance](https://arxiv.org/abs/2409.04593)
    - 기존 DocQA는 personalized x, 최신 정보 업데이트 용이성 x 라는 점을 한계로 지적
    - → thought-retrieval을 기반으로 researcher를 돕는 self-evoling, efficient LLM 시스템 제안
    - 69.92%의 시간을 절약할 수 있다고 주장
    - [허깅페이스 스페이스 링크](https://huggingface.co/spaces/ulab-ai/ArxivCopilot) 🔗
- 🧑🏻‍💻 [Mistral] pixtral-12b-240910
    - text-based Nemo 12B에 400M vision adapter를 합친 모델
    - 1024 x 1024 이미지까지 처리 가능하며 16 x 16 단위로 쪼갠다고 알려짐
    - 131,072개의 unique tokens
    - 업데이트 되지 않는 모델 체크포인트를 허깅페이스에 공개
    - [허깅페이스 링크](https://huggingface.co/mistral-community/pixtral-12b-240910) 🔗
- 🧑🏻‍💻 [SambaNova] [SambaNova Launches The World's Fastest AI Platform](https://sambanova.ai/press/worlds-fastest-ai-platform)
    - Llama 3.1 405B 모델이 full precision으로 초당 132 토큰 출력 가능 / 70B는 570토큰
    - 오픈소스는 아니고 fine-tuning과 inference 솔루션을 판매하는 기업의 제품으로 보임
- 📜 [United We Care] [LLMs Will Always Hallucinate, and We Need to Live With This](https://arxiv.org/abs/2409.05746)
    - hallucination이 LLM의 수학적, 논리적 구조로부터 필연적으로 발생함을 입증
    - → 따라서 아키텍쳐 개선, 데이터셋 증가, fact-checking 등으로 hallucination을 제거한다는 것은 불가능하다고 주장
- 📜 [KAIST] [Think Together and Work Better: Combining Humans' and LLMs' Think-Aloud Outcomes for Effective Text Evaluation](https://arxiv.org/abs/2409.07355)
    - Think-Aloud (TA) 방법을 사용해서 checklist 기반의 텍스트 평가를 생성하도록 하는 human expertise & LLM 통합 프레임워크, InteractEval 제안
    - 사람은 Coherence & Fluency와 같은 internal quality와 관련된 작업에 능하고, LLM은 Consistency & Relavance와 같은 external alignment에 능하다는 분석 결과
    - [깃허브 링크](https://github.com/BBeeChu/InteractEval.git) 🔗
- 🧑🏻‍💻 [Intel, DeepLearning.AI] [Multimodal RAG: Chat with Videos](https://www.deeplearning.ai/short-courses/multimodal-rag-chat-with-videos/)
    - short course에 Multimodal RAG와 관련된 강의를 인텔에서 제작
- 🧑🏻‍💻 [Google] [DataGemma: Using real-world data to address AI hallucinations](https://blog.google/technology/ai/google-datagemma-ai-llm/)
    - Data Commons로부터의 real-world 통계 데이터를 통합함으로써 hallucination을 줄인 DataGemma를 공개
    - RIG(Retrieval-Interleaved Generation) & RAG 사용
- 📜 [Tsinghua] [General OCR Theory: Towards OCR-2.0 via a Unified End-to-end Model](https://arxiv.org/abs/2409.01704)
    - 580M 사이즈의 OCR-2.0 방식의 General OCR Theory (GOT) 모델을 공개
    - scene, document, whole-page 스타일 등 다양한 이미지 양식을 커버할 수 있고 “글자” 단위로 처리하는 OCR tasks도 다룰 수 있음
    - 좌표나 색상 등으로 설명되는 region-level recognition도 가능
- 🧑🏻‍💻 [FutureHouse] [PaperQA2](https://github.com/Future-House/paper-qa)
    - PDF 또는 텍스트 파일 대상으로 RAG를 수행하여 논문을 쉽게 읽을 수 있도록 도와주는 패키지
    - QA, 요약, contradiction detection 등 가능
    - `pip install paper-qa`
    - [논문 링크](https://storage.googleapis.com/fh-public/paperqa/Language_Agents_Science.pdf) 🔗
- 🧑🏻‍💻 [OpenAI] [Introducing OpenAI o1-preview](https://openai.com/index/introducing-openai-o1-preview/)
    - 더 오래 생각하고 복잡한 문제를 해결하는 새로운 AI 모델 시리즈 'OpenAI o1' 출시
    - 과학, 코딩, 수학 분야에서 뛰어난 성능 보임 (예: IMO 예선 83% 정답률, Codeforces 89번째 백분위)
    - o1-preview와 o1-mini 두 모델 제공, ChatGPT Plus/Team 사용자와 일부 API 개발자들에게 접근 권한 부여
    - 향상된 안전 기능 적용 (jailbreaking 테스트에서 GPT-4o 대비 큰 성능 향상)
    - [OpenAI o1 System Card](https://openai.com/index/openai-o1-system-card/) 🔗
- 📜 [University of Mannheim] [Fine-tuning Large Language Models for Entity Matching](https://arxiv.org/abs/2409.08185)
    - 기존: entity matching을 주로 prompt engineering & in-context learning 으로 해결
    - → LLM fine-tuning: 1) LLM이 생성한 학습용 설명 데이터셋 2) LLM을 이용한 학습 데이터 선별
    - sLLM (Llama 3.1 8B) > LLM (GPT-4o Mini), in-domain > cross-domain, structured data 효과적
- 📜 [Meta, Oxford, UCL] [Source2Synth: Synthetic Data Generation and Curation Grounded in Real Data Sources](https://arxiv.org/abs/2409.08239)
    - human annotation 없이 LLM에게 새로운 스킬을 가르쳐주는 방법, Source2Synth 제안
    - custom data source 입력 → real-wrold source에 근거한 intermediate reasoning step을 포함하여 합성 데이터를 생성
    - answerability에 따라 low-quality generation를 버릴 수 있어 데이터셋 퀄리티가 개선됨
    - multi-hop question answering (MHQA), tool usage in tabular question answering (TQA) 에 효과적
- 📜 [Alibaba] [mPLUG-DocOwl2: High-resolution Compressing for OCR-free Multi-page Document Understanding](https://arxiv.org/abs/2409.03420)
    - OCR-free Document Understanding을 지원하는 현 MLLMs는 한 개 문서 이미지에 대해 너무 많은 visual tokens를 생성해야 해서 과도한 GPU 사용과 추론 속도 저하라는 문제점이 존재
    - → low-resolution global visual feature를 근거로 high-resolution document 이미지를 324개 토큰으로 압축하는 모듈, High-resolution DocCompressor 제안
    - Three-stage training framework: 1) Single-image Pretraining 2) Multi-image Continue-pretraining 3) Multi-task Finetuning
</details>

<details>
  <summary>3rd week</summary>

- 🧑🏻‍💻 [Stability.AI] [Stable Diffusion 3 Medium Fine-tuning Tutorial](https://www.notion.so/17f90df74bce4c62a295849f0dc8fb7e?pvs=21)
    - SD3M 모델의 파인튜닝 튜토리얼을 공개
    - 기존 SD1.5, SDXL 모델과 SD3M 파인튜닝의 차이점 설명
- 📜 [CMU, MIT] [Agent Workflow Memory](https://arxiv.org/abs/2409.07429)
    - 현재 방법론들은 복잡한 action trajectories를 갖는 long-horizon task를 잘 처리하지 못함
    - Agent Workflow Memory (AWM): 자주 반복되는 routine을 induce 하는 방법론으로, agent에게 workflow를 선택적으로 제공
    - offline & online 시나리오 둘 다 적용 가능, Mind2Web & WebArena 벤치마크로 실험
    - [깃허브 링크](https://github.com/zorazrw/agent-workflow-memory) 🔗
- 📜 [KAIST] [Stable Language Model Pre-training by Reducing Embedding Variability](https://arxiv.org/abs/2409.07787)
    - Token Embedding Variability (TEV) 를 사전 학습 동안의 모델 안정성을 평가하는 proxy로 사용
    - Multi-head Low-Rank Attention (MLRA), output embedding의 exponential growth를 제안함으로써 instability를 완화
    - 연구실에서는 아직도 GPT-2, Llama-2 등을 사용할 수밖에 없는 실정..
- 📜 [Peking, Microsoft] [CPL: Critical Planning Step Learning Boosts LLM Generalization in Reasoning Tasks](https://arxiv.org/abs/2409.08642)
    - 현재 언어 모델들은 task-specific reasoning에만 집중하고 generalization capabilities에는 관심이 없음
    - → Monte Carlo Tree Search (MCTS)를 이용하여 multi-step reasoning tasks 내의 다양한 planning step을 탐색하는 Critical Planning Step Learning (CPL) 제안
    - Step-APO (Step-level Adavantage Preference Optimization): MCTS를 통해 획득 가능한 step-level 선호쌍을 DPO와 통합
- 📜 [Wisconsin-Madison] [Your Weak LLM is Secretly a Strong Teacher for Alignment](https://arxiv.org/abs/2409.08813)
    - 현존 alignment framework는 human effort 또는 높은 computational cost를 필요로 함
    - → weak LLM을 이용해서 human feedback만 사용할 때에 준하는, 혹은 그 이상의 효율을 뽑아내고자 함
    - 본 연구에서는 OPT-125M 모델을 사용 → 굉장히 작은 사이즈의 모델로도 좋은 결과를 얻었다고 볼 수 있음
- 📜 [Chinese Academy of Sciecnes] [StruEdit: Structured Outputs Enable the Fast and Accurate Knowledge Editing for Large Language Models](https://arxiv.org/abs/2409.10132)
    - 최신 정보를 모델에 주입하는 것은 굉장히 어려운 태스크여서 아직 잘 풀리지 않음. 그 원인 중 하나로 unstructured natural language outputs를 들고 있음
    - → StruEdit 제안: reasoning triplet으로 structured output을 반환하도록 프롬프팅 → outdated knowledge를 제거하고 효율적으로 up-to-date 정보로 채워 넣음
- 🧑🏻‍💻 [Microsoft] [Microsoft 365 Copilot Wave 2: Pages, Python in Excel, and agents](https://www.microsoft.com/en-us/microsoft-365/blog/2024/09/16/microsoft-365-copilot-wave-2-pages-python-in-excel-and-agents/)
    - Copilot 페이지 내에서 프롬프트 기반으로 검색 & 결과 정리한 것을 다른 사람들과 쉽게 공유할 수 있음
    - 이런 통합 시스템을 구현하겠다고 작년부터 구글과 경쟁하고 있는 것 같은데 실효성은 아직 잘 모르겠음
- 🧑🏻‍💻 [Waymo] [Waymo’s Self-driving cars beat humans in safety](https://link.mail.beehiiv.com/ss/c/u001.22XVe7hOOQo4HoFgEcBa71etRz_zVbDtBQ3xhBSmS3-n3f-hnoXyvvOxUSLr6qeJjN2gRzsBXkF6QrPYsjDpmxZwZNAKYsVbeUOzsTe6a_ioIFmsIrSF-HGC5aYKMdFl60qp-lMR26Rog3HlP7SWkyVB7rS969GLVp_nHwbyxhVj49y4OmafUcEihqsRFHAfHOiNhhQf-x74RW5v2pZrVumPsWdi3iQ1YD0HoorhANkbGv8gZPD2HcT6bYgL27bo7FOqPcrK3Gu_O7mJwUdrtsAszFpNLNaSiT12CgLdjcM/49u/CsYMakzZSD6FfomXvnqCHg/h24/h001.wdQJP84KSzOLsjJU3kuEDFJFbyKEvKR3ubNxu0y-MT0)
    - 웨이모피셜) AI가 자율주행한 것이 사람보다 사고율이 낮았다. 사고 원인도 AI 시스템보다 외부에 많았다고 X에 공개
- 🧑🏻‍💻 [Google] [NotebookLM now lets you listen to a conversation about your sources](https://blog.google/technology/ai/notebooklm-audio-overviews/)
    - 두 명의 AI 호스트가 주제에 대해 이야기를 나누는 형식으로 만들어주는 서비스
    - 구글 [Illuminate](https://illuminate.google.com/home)에 이것이 사용된 것으로 보이고 Gemini 1.5의 멀티모달 능력을 이용
    - [NotebookLM 링크](http://notebooklm.google/) 🔗
- 📜 [Huawei] [Large Language Models are Good Multi-lingual Learners : When LLMs Meet Cross-lingual Prompts](https://arxiv.org/abs/2409.11056)
    - long & complex contexts를 잘 이해할 수 있도록 Multi-Lingual Prompt, MLPrompt 제안
    - LLM이 다른 언어로는 따르기 어려워하는 error-prone rule을 자동으로 번역
    - structured data 생성에 대한 auto-checking 메커니즘을 포함하는 프레임워크를 공개
        - 이 부분은 확인할 필요가 있을 듯
- 🧑🏻‍💻 [Mistral AI] [AI in abundance](https://mistral.ai/news/september-24-release/)
    - 실험과 프로토타입을 위한 무료 티어를 제공
    - Mistral AI 모델들의 비용을 크게 줄임: Nemo 50%, Small & Codestral 80%, Large 33, …
    - le Chat에서 사용 가능한 Pixtral 12B 모델을 Apache 2.0 라이센스로 공개
- 🧑🏻‍💻 [Qwen] [Qwen2.5: A Party of Foundation Models!](https://qwenlm.github.io/blog/qwen2.5/)
    - Qwen2를 업데이트하여 Qwen2.5, -Coder, -Math를 공개. 사이즈가 굉장히 다양함.
    - 3B & 72B 를 제외한 모델들은 Apache 2.0 라이센스
    - 18T 토큰으로 학습하여 coding, mathematics, instruction following, long texts 등 다양한 영역에서 강점을 보임 → 128K 윈도우 사이즈 지원, 8K 토큰까지 생성 가능, 29개 언어 지원
- 📜 [ETRI] [A Comprehensive Evaluation of Quantized Instruction-Tuned Large Language Models: An Experimental Analysis up to 405B](https://arxiv.org/abs/2409.11055)
    - 기존 quantized LLM 평가는 perplexity와 같은 메트릭 또는 구식 데이터셋으로 평가가 이뤄짐
    - → GPTQ, AWQ, SmoothQuant, FP8 등 다양한 방식, 7B ~ 405B 사이즈 모델. 13개 벤치마크에서 평가
    - (1) FP 16 LLM은 hallucination detection & instruction following 제외하고 괜찮
    - (2) quantization 방법, 모델 사이즈, bit-width 등에 따라 결과가 천차만별
    - (3) task 난이도가 accuracy degradation에 그렇게 큰 영향을 주지는 않음
    - (4) MT-Bench 평가 방식은 뛰어난 최근 LLM들의 독보적인 능력이 발휘되기에 적합하지는 않음
- 🧑🏻‍💻 [HuggingFace] [Fine-tuning LLMs to 1.58bit: extreme quantization made easy](https://huggingface.co/blog/1_58_llm_extreme_quantization)
    - Microsoft Research에서 제안한 [BitNet](https://arxiv.org/abs/2402.17764) 구현체에 대한 설명
    - 허깅페이스에서 1.58b 로 학습하고 추론하는 방법에 대한 블로그 글을 게시
- 🗞️ [Snap] [Introducing New Spectacles and Snap OS: The Next Frontier of AR Glasses](https://newsroom.snap.com/sps-2024-spectacles-snapos)
    - Snap에서 5세대 spectacle을 공개. Sanp OS로 동작하는 AR glasses임
    - OpenAI와의 파트너십을 발표하여 화제
- 📜 [ETH] [Breaking reCAPTCHAv2](https://arxiv.org/abs/2409.08831)
    - 구글의 reCAPTCHAv2 시스템을 머신러닝으로 풀기 위한 연구
    - YOLO 모델을 사용하여 100% 확률로 통과할 수 있었으며, 통과에 필요한 문제 수가 사람과 다르지 않다는 결론
    - [깃허브 링크](https://github.com/aplesner/Breaking-reCAPTCHAv2) 🔗
- 📜 [Texas at Austin, Johns Hopkins, Princeton] [To CoT or not to CoT? Chain-of-thought helps mainly on math and symbolic reasoning](https://arxiv.org/abs/2409.12183)
    - 100개 논문에 대한 메타 데이터 분석, 14개 모델로 20개 데이터셋을 평가
    - → CoT는 math, logic 과 같이 논리적인 태스크에서는 효과적이지만 그 외에는 그닥 영향이 없음
    - MMLU에서 질문이나 모델의 답변에 ‘=’ 기호를 포함하는 태스크를 제외하고서는 CoT를 쓰나 안쓰나 비슷
    - 따라서 CoT는 상황에 맞게 선별적으로 사용하는 것이 좋을 것 같다는 결론
- 📜 [Texas at San Antonio] [Improving LLM Reasoning with Multi-Agent Tree-of-Thought Validator Agent](https://arxiv.org/abs/2409.11527)
    - 기존 multi-agent reasoning은 추론 경로를 얕게 탐색한다는 문제, ToT는 여전히 잘못된 path가 최종 결론으로 이어질 수 있다는 문제점을 포함하고 있음
    - Thought Validator agent를 동반한 ToT 기반의 Reasoner agent를 제시
- 📜 [Qwen] Qwen2.5-Coder Technical Report
    - CodeQwen1.5의 후속작 Qwen2.5-Coder-1.5B, 7B의 테크니컬 리포트
    - 데이터 정제, 합성 데이터 생성, 데이터 혼합 등. 5.5T 토큰으로 학습. 큰 사이즈 모델보다도 뛰어난 성능을 보고.
    - [허깅 페이스](https://hf.co/Qwen/Qwen2.5-Coder-7B-Instruct), [깃허브](https://github.com/QwenLM/Qwen2.5-Coder) 링크 🔗
- 🧑🏻‍💻 [GitHub] [Try out OpenAI o1 in GitHub Copilot and Models](https://github.blog/news-insights/product-news/try-out-openai-o1-in-github-copilot-and-models/)
    - OpenAI의 o1-preview & o1-mini를 GitHub Copilot 으로 사용 가능. [wait list](https://github.com/o1-waitlist-signup)에 등록해야 함.
    - Copilot Chat 중간에 o1-preview, o1-mini, GPT-4o 모델 간 변경 가능
- 🧑🏻‍💻 [Open-source FinePersonas datasets dropped in Huggingface with 21 million rows and 142GB size](https://huggingface.co/datasets/argilla/FinePersonas-v0.1)
    - 21M개의 페르소나 데이터. 특정 페르소나에 대한 설명이 어떻게 라벨링 되어야 하는지 나타나있음.
    - 어떤 프롬프트를 사용했는지도 함께 공개
- 📜 [Microsoft] [Re-Reading Improves Reasoning in Large Language Models](https://arxiv.org/abs/2309.06275)
    - 질문을 input으로 다시 Re-Reading 하는 방법, RE2를 제안
    - 질문을 두 번 처리함으로써 과정에 대한 이해도를 높인다는 것이 컨셉
    - 단방향의 decoder-only LLM에서 “bidirectional” encoding을 사용하여 global information 활용
- 📜 [Huawei, McGill, Mila] [Enhancing Logical Reasoning in Large Language Models through Graph-based Synthetic Data](https://arxiv.org/abs/2409.12437)
    - 그래프 기반의 synthetic reasoning data를 training signal로 사용하여 LLM의 추론 능력을 향상시키고자 시도
    - 기존의 다른 능력들을 손상시키지 않으면서도 추론 능력을 향상시킬 수 있었다고 주장
    - [깃허브 링크](https://arxiv.org/abs/2409.12437) 🔗
- 📜 [Google DeepMind] [Training Language Models to Self-Correct via Reinforcement Learning](https://arxiv.org/abs/2409.12917)
    - multi-turn online reinforcement learning (RL) approach, SCoRE 개발
    - 전적으로 self-generated data를 이용하여 LLM의 self-correction 능력을 발전
    - offline model-generated correction traces (이를테면 SFT)는 self-correction behavior를 instill 하기엔 부족하다고 주장
</details>

<details>
  <summary>4th week</summary>

- 📜 [HKUST, Amazon] [Constrained Reasoning Chains for Enhancing
Theory-of-Mind in Large Language Models](https://arxiv.org/abs/2409.13490)
    - Theory-of-Mind (ToM) 방법론은 주로 zero-shot prompting을 사용하기 때문에 복잡한 reasoning task에서 낮은 퍼포먼스를 보임
    - zero-shot prompting method, Constrained Chain-of-ToM (CCoToM) 제안
    - prompts에 대한 constraint를 adaptively 부과함으로써 inductive bias를 유도
- 📜 [Tsinghua, Berkely, Anthropic, NYU] [Language Models Learn to Mislead Humans via RLHF](https://arxiv.org/abs/2409.12822)
    - RLHF는 LM이 만든 에러를 사람이 알아차리기 더욱 어렵게 만든다고 주장 → “U-Sophistry” (Unintended)
    - 모델의 출력 결과를 사람이 직접 평가 → RLHF는 모델의 성능도 평가하기 어렵게 만든다.
- 📜 [Tsinghua, Shanhai AI Lab] [On the Diagram of Thought](https://arxiv.org/abs/2409.10038)
    - LLM이 Directed Acyclic Graph (DAG) 으로서 iterative reasoning 할 수 있도록 모델링 하는 Diagram of Thought (DoT) 제안
    - propositions, critiques, refinements, verifications를 DAG 구조 내에 포함 → logical consistency를 유지하면서도 모델이 복잡한 reasoning pathways를 탐색하도록 함
- 📜 [Arizona State University] [LLMs Still Can't Plan; Can LRMs? A Preliminary Evaluation of OpenAI's o1 on PlanBench](https://arxiv.org/abs/2409.13373)
    - LLM의 빠른 발전에도 PlanBench 정복은 쉽지 않았음
    - o1과 같은 Large Reasoning Model (LRM) 은 분명 눈에 띄는 성능 향상을 보여주고 있으나 아직까지 planning 능력이 충분하지 않다고 주장
- 📜 [NYU, Columbia] [Style over Substance: Failure Modes of LLM Judges in Alignment Benchmarking](https://arxiv.org/abs/2409.15268)
    - LLM-judge 선호를 구체적인 metric으로 전환할 수 있을까? → SOS-BENCH 개발: standardized, reproducible LLM meta-benchmark
    - LLM-judgement는 safety, world knowledge, instruction following과 관계가 없다고 주장. 대신 style에 대해 더 높은 우선순위를 부여하고 있는 것으로 관측.
    - [코드 및 결과물 링크](https://anonymous.4open.science/r/mismo-bench-587D/readme.md) 🔗
- 📜 [NVIDIA] [Advancing the Accuracy-Efficiency Frontier with Llama-3.1-Nemotron-51B](https://developer.nvidia.com/blog/advancing-the-accuracy-efficiency-frontier-with-llama-3-1-nemotron-51b/)
    - Llama-3.1-70B 대비 220% 빠르고 400% 많은 workload를 처리할 수 있는 51B 모델 공개
    - 40B tokens from FineWeb, Buzz-V1.2, and Dolma datasets
    - Packaged as NVIDIA NIM inference microservice for easy deployment
    - [허깅페이스 링크](https://huggingface.co/nvidia/Llama-3_1-Nemotron-51B-Instruct) 🔗
- 📜 [Google DeepMind] [Michelangelo: Long Context Evaluations Beyond Haystacks via Latent Structure Queries](https://arxiv.org/abs/2409.12640)
    - a minimal, synthetic, and unleaked long-context reasoning evaluation for
    LLM
    - context 내에서 단순히 정보를 retrieve 하는 것 이상의 long-context 평가를 하기 위한 통합 평가 프레임워크
    - 코드 및 자연어 도메인에서 3개의 diagnostic long-context evaluations
</details>
