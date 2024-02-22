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
</details>
