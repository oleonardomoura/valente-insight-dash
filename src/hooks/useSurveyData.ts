import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SurveyResponse {
  submission_id: string;
  respondent_id: string;
  submitted_at: string;
  qual_curso_você_deseja_avaliar: string;
  selecione_a_turma_que_você_está_estudando: string;
  selecione_oa_professora_responsável_pelo_curso: string;
  data_de_início_do_curso: string;
  data_de_término_do_curso: string;
  
  // Methodology scores
  q1_a_metodologia_de_ensino_utilizada_no_curso_estimulou_a_mi: number;
  q2_a_metodologia_de_ensino_utilizada_no_curso_facilitou_a_ap: number;
  q3_escreva_seu_feedback_sobre_a_metodologia_de_ensino_opcion: string;
  
  // Professor scores
  q1_organização_planejamento_do_curso: number;
  q2_relacionamento_com_a_turma: number;
  q3_domínio_do_assunto_conhecimento: number;
  q4_aplicabilidade_dos_conteúdos_abordados_em_sala: number;
  q5_didática_e_comunicação: number;
  q6_pontualidade_do_professor: number;
  q7_escreva_seu_feedback_sobre_oa_professora: string;
  
  // Infrastructure scores
  q1_equipe_de_apoio: number;
  q2_estrutura_da_sala_de_aula: number;
  q3_conforto_e_climatização_do_ambiente: number;
  
  // Self-assessment scores
  q1_minha_presença_e_participação_no_curso: number;
  q2_minha_postura_acadêmica_perante_a_turma: number;
  q3_uso_de_aparelhos_eletrônicos: number;
  q4_meu_nível_de_aprendizado_e_autodesenvolvimento: number;
  q1_qual_foi_o_seu_nível_de_aproveitamento_no_curso: string;
  q5_escreva_seu_autofeedback_sobre_sua_participação: string;
  
  // NPS scores
  q2_em_uma_escala_de_0_a_10_qual_é_a_probabilidade_de_você_re: number;
  q3_em_uma_escala_de_0_a_10_qual_é_a_probabilidade_de_você_re: number;
  
  // Improvement feedback
  q4_como_podemos_melhorar: string;
  caso_queira_receber_um_retorno_sobre_sua_pesquisa_de_satisfa: string;
}

export function useSurveyData() {
  const [data, setData] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data: surveyData, error } = await supabase
          .from('Pesquisa de Satisfação')
          .select('*')
          .order('submitted_at', { ascending: false });

        if (error) {
          throw error;
        }

        setData(surveyData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}